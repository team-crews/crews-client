import { cn } from '../../lib/utils';
import React from 'react';

interface FooterContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const FooterContainer = ({ children, className }: FooterContainerProps) => {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 flex w-dvw justify-end gap-2 border-t border-crews-b02 bg-crews-w01 px-4 py-2',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FooterContainer;
