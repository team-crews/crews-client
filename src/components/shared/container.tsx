import React from 'react';
import { cn } from '../../lib/utils.ts';

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('h-full w-full', className)}>{children}</div>;
};

export default Container;
