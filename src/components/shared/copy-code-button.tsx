import { Button, ButtonProps } from '../shadcn/button.tsx';
import { useToast } from '../../hooks/use-toast.ts';
import React from 'react';
import { printCustomError } from '../../lib/utils/error.ts';

const CopyCodeButton = ({
  code,
  ...props
}: ButtonProps & {
  code: string;
}) => {
  const { toast } = useToast();

  const handleClipboardClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: '복사가 완료되었습니다.',
        state: 'success',
      });
    } catch (e) {
      printCustomError(e, 'handleClipboardClick');
      toast({
        title: '예기치 못한 오류가 발생했습니다.',
        state: 'error',
      });
    }
  };

  return (
    <Button {...props} onClick={handleClipboardClick}>
      모집 코드 복사
    </Button>
  );
};

export default CopyCodeButton;
