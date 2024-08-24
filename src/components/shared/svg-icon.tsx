import { cn } from '../../lib/utils';

interface SvgIconProps {
  src: string;
  className?: string;
  alt?: string;
}

const SvgIcon = ({ src, className, alt }: SvgIconProps) => {
  return <img src={src} alt={alt || 'SVG Icon'} className={cn(className)} />;
};

export default SvgIcon;
