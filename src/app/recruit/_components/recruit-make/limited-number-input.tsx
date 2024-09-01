import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { cn } from '../../../../lib/utils.ts';

interface LimitedNumberInputProps {
  name: string;
  maxLength: number;
}

const widthPerLength: { [key: number]: string } = {
  1: 'w-[0.625rem]',
  2: 'w-[1.125rem]',
  3: 'w-[1.75rem]',
  4: 'w-[2.375rem]',
};

const LimitedNumberInput = ({ name, maxLength }: LimitedNumberInputProps) => {
  const { watch, setValue } = useFormContext();

  const numberValue = watch(name);

  const placeholder = '0'.repeat(maxLength);

  const [inputWidth, setInputWidth] = useState<string>();

  /**
   *
   */
  const handleLimitedNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    const numberRegex = /^$|^\d+$/;

    if (!numberRegex.test(value) || value.length > maxLength) {
      return;
    }

    const isValueNull = value !== '';

    const updatedValue = isValueNull ? Number(value) : null;

    setValue(name, updatedValue);
  };

  useEffect(() => {
    const widthClass =
      numberValue === null
        ? widthPerLength[maxLength]
        : widthPerLength[Math.min(numberValue.toString().length, 4)];

    setInputWidth(widthClass);
  }, [maxLength, numberValue]);

  return (
    <div
      className={cn(
        'flex h-[0.875rem] w-[18px] items-center justify-center border-b-[1px] border-crews-bk02',
        inputWidth,
      )}
    >
      <input
        value={numberValue}
        className="h-full w-full text-[0.875rem] font-bold text-crews-bk02"
        placeholder={placeholder}
        onChange={(e) => handleLimitedNumberChange(e)}
      />
    </div>
  );
};

export default LimitedNumberInput;
