import { Button } from '../../../../components/shadcn/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../../../../components/shadcn/dialog';
import { cn } from '../../../../lib/utils/utils';

interface PreviewDialogProps {
  isOpen: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
  className?: string;
}

const PreviewDialog = ({
  isOpen,
  toggleOpen,
  children,
  className,
}: PreviewDialogProps) => {
  const handleCloseClick = () => {
    toggleOpen();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          'flex flex-col items-center overflow-y-auto px-6 pt-4',
          className,
        )}
      >
        <AlertDialogTitle className="hidden" />
        <AlertDialogDescription className="hidden" />
        <section className="w-full flex-1">{children}</section>
        <div className="sticky bottom-0 flex w-full justify-end gap-3 bg-white py-2">
          <Button className="w-[4rem]" onClick={handleCloseClick} size="sm">
            닫기
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PreviewDialog;
