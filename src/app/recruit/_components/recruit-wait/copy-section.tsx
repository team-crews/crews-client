import { useToast } from '../../../../hooks/use-toast.ts';
import React from 'react';
import { printCustomError } from '../../../../lib/utils/error.ts';

const CopySection = ({ recruitmentCode }: { recruitmentCode: string }) => {
  const { toast } = useToast();

  const handleClipboardClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://join-crews.site/recruitment/info?recruitmentCode=${recruitmentCode}`,
      );
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
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-crews-b01 py-6">
      <p className="text-2xl font-semibold text-crews-bk01">
        <button
          onClick={handleClipboardClick}
          className="font-bold text-crews-b05 underline"
        >
          여기
        </button>
        를 눌러 공고 링크를 복사하세요 🗣️
      </p>
      <p className="text-crews-g04">홍보에 해당 링크를 첨부하세요.</p>
    </section>
  );
};

export default CopySection;
