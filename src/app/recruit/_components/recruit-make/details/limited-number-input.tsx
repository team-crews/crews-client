import { useFormContext } from 'react-hook-form';
import { isFilledInput } from '../../../../../lib/utils/validation.ts';

function getLength(value: string | number | undefined): number {
  if (typeof value === 'number') return Math.abs(value).toString().length;
  else if (typeof value === 'string') return value.length;
  else return 0;
}

const LimitedNumberInput = ({
  name,
  maxLength,
  type,
}: {
  name: string;
  maxLength: number;
  type: 'NARRATIVE' | 'SELECTIVE';
}) => {
  const { register, watch } = useFormContext();
  const placeholder = '0'.repeat(maxLength);

  const value = watch(name);
  const inputLength = getLength(value)
    ? Math.min(getLength(value), maxLength)
    : maxLength;

  const maxVal = type === 'NARRATIVE' ? 1500 : 10;
  return (
    <input
      autoComplete="off"
      type="number"
      maxLength={maxLength}
      {...register(name, {
        onChange: (e) => {
          if (e.target.value === '') e.target.value = '';
          else if (e.target.value <= 0) e.target.value = 1;
          else if (e.target.value >= maxVal) e.target.value = maxVal;
        },
        valueAsNumber: true,
        validate: {
          validateIfFilled: (v) =>
            isFilledInput(
              v,
              '채워지지 않은 글자수 제한 혹은 선택지 개수 제한이 존재해요.',
            ),
        },
      })}
      className="text-right text-xs font-bold text-crews-bk02 underline"
      placeholder={placeholder}
      style={{ width: `${inputLength}ch` }}
    />
  );
};

export default LimitedNumberInput;
