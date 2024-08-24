import { cn } from '../../lib/utils';

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  children: React.ReactNode;
  className?: string;
}

const Typography = ({ children, className }: TypographyProps) => {
  return (
    <span
      className={cn(
        'font-pretendard text-[1rem] font-normal leading-[120%] text-crews-bk01',
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Typography;
