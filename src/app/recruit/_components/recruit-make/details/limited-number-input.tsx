import { useFormContext } from 'react-hook-form';
import {
  isFilledInput,
  isNumber,
} from '../../../../../lib/utils/validation.ts';

function getLength(value: string | number | undefined): number {
  if (typeof value === 'number') return Math.abs(value).toString().length;
  else if (typeof value === 'string') return value.length;
  else return 0;
}

const LimitedNumberInput = ({
  name,
  maxLength,
}: {
  name: string;
  maxLength: number;
}) => {
  const { register, watch } = useFormContext();
  const placeholder = '0'.repeat(maxLength);

  const value = watch(name);
  const inputLength = getLength(value) || maxLength;

  return (
    <input
      maxLength={maxLength}
      {...register(name, {
        validate: {
          isFilledInput: (v) =>
            isFilledInput(
              v,
              '채워지지 않은 글자수 제한 혹은 선택지 개수 제한이 존재해요.',
            ),
          isNumber: (v) =>
            isNumber(v, '글자수 제한 및 선택지 개수 제한은 숫자여야 해요.'),
        },
      })}
      className="text-right text-xs font-bold text-crews-bk02 underline"
      placeholder={placeholder}
      style={{ width: `${inputLength}ch` }}
    />
  );
};

export default LimitedNumberInput;
