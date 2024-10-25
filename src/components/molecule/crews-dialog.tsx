import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../shadcn/dialog.tsx';
import React from 'react';
import { Button } from '../shadcn/button.tsx';
import { cn } from '../../lib/utils/utils.ts';

const CrewsDialog = ({
  isOpen,
  toggleOpen,
  children,
  action = async () => {},
  type = 'CONFIRM',
  className,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  action?: (() => Promise<void>) | (() => void);
  type?: 'ALERT' | 'CONFIRM';
  children: React.ReactNode;
  className?: string;
}) => {
  const handleConfirmClick = async () => {
    await action();
  };

  const handleCancelClick = () => {
    toggleOpen();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          'flex flex-col items-center overflow-y-auto p-6',
          className,
        )}
      >
        <AlertDialogTitle className="hidden" />
        <AlertDialogDescription className="hidden" />
        <section className="w-full flex-1">{children}</section>
        <div className="sticky bottom-0 flex w-full gap-4 bg-transparent pt-6">
          {type === 'CONFIRM' && (
            <Button
              className="flex-1"
              onClick={handleCancelClick}
              size="sm"
              variant="gray"
            >
              취소
            </Button>
          )}
          <Button className="flex-1" onClick={handleConfirmClick} size="sm">
            확인
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CrewsDialog;
