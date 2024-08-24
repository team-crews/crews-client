import React from 'react';
import { cn } from '../../lib/utils.ts';

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  className?: string;
};

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'w-full rounded-md bg-crews-b05 p-2.5 text-sm font-bold text-crews-w01',
        className,
      )}
      {...props}
    />
  );
};

export default Button;
