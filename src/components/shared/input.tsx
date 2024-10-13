import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '../../lib/utils/utils.ts';
import CircleXMarkIcon from '../../assets/icons/circle-x-mark-icon.svg?react';
import EyeSlashIcon from '../../assets/icons/eye-slash-icon.svg?react';
import EyeIcon from '../../assets/icons/eye-icon.svg?react';

import { cva, VariantProps } from 'class-variance-authority';

export type InputState = 'error' | 'filled' | 'empty';

const variants = cva(
  'w-full rounded py-2 text-sm font-normal text-crews-bk02 outline outline-1 indent-2 outline-crews-g03 placeholder:font-normal placeholder:text-crews-g04 focus:bg-crews-b02 focus:outline-2 hover:outline-crews-g05 focus:outline-crews-b04',
  {
    variants: {
      state: {
        empty: '',
        filled: '',
        error:
          'outline outline-crews-r02 bg-crews-r01 focus:outline-crews-r02 focus:bg-crews-r01 animation-shake',
      },
    },
    defaultVariants: {
      state: 'empty',
    },
  },
);

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'onFocus'
> & {
  className?: string;
  registerReturns: UseFormRegisterReturn;
  clearInput: () => void;
} & VariantProps<typeof variants>;

const Input = ({
  className,
  registerReturns,
  clearInput,
  state,
  ...props
}: InputProps) => {
  const [focus, setFocus] = useState<boolean>(false);

  const [customInputType, setCustomInputType] = useState<string>(
    props.type || 'text',
  );

  const toggleCustomInputType: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.preventDefault();
    setCustomInputType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  const handleXClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    clearInput();
  };

  return (
    <div
      className={cn(
        'relative',
        className,
        state === 'error' ? 'animate-shake' : '',
      )}
    >
      <input
        className={cn(variants({ state }))}
        {...registerReturns}
        {...props}
        type={customInputType}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete="off"
      />
      {focus && (
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform gap-2 text-crews-g04">
          {props.type !== 'password' ? null : (
            <button type="button" onMouseDown={toggleCustomInputType}>
              {customInputType === 'password' ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          )}

          <button type="button" onMouseDown={handleXClick}>
            <CircleXMarkIcon className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
