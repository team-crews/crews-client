import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

// import { cva, VariantProps } from 'class-variance-authority';
// const variants = cva(
//   'flex items-center rounded-lg border-[1px] p-2 text-sm font-normal text-text-001 placeholder-text-003 border-brand-gray-light',
//   {
//     variants: {
//       state: {
//         empty: 'border-brand-gray-heavy',
//         focused: 'border-brand-blue-heavy',
//         filled: 'bg-brand-gray-light',
//       },
//     },
//     defaultVariants: {
//       state: 'empty',
//     },
//   },
// );

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  className?: string;
  registerReturns: UseFormRegisterReturn;
  handleXClick: React.MouseEventHandler<HTMLButtonElement>;
};
// & VariantProps<typeof variants>;

const Input = ({
  className,
  registerReturns,
  handleXClick,
  ...props
}: InputProps) => {
  return (
    <div
      className={className}
      // className={cn(
      //   variants({ state }),
      //   className,
      // )}
    >
      <input {...registerReturns} {...props} />
      <button type="button" onClick={handleXClick}>
        x
      </button>
    </div>
  );
};

export default Input;
