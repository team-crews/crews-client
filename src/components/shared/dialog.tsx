import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../ui/dialog.tsx';
import React from 'react';
import { Button } from '../ui/button.tsx';

const Dialog = ({
  isOpen,
  toggleOpen,
  children,
  action = async () => {},
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  action?: () => Promise<void>;
  children: React.ReactNode;
}) => {
  const handleConfirmClick = async () => {
    toggleOpen();
    await action();
  };

  const handleCancelClick = () => {
    toggleOpen();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="flex w-96 flex-col items-center">
        <AlertDialogTitle className="hidden" />
        <AlertDialogDescription className="hidden" />
        {children}
        <div className="flex w-full gap-4">
          <Button onClick={handleCancelClick} className="flex-1" variant="gray">
            취소
          </Button>
          <Button onClick={handleConfirmClick} className="flex-1">
            확인
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
