import FooterContainer from '../../../../components/shared/footer-container.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import Dialog from '../../../../components/shared/dialog.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../../hooks/use-toast.ts';
import useDialog from '../../../../hooks/use-dialog.ts';
import handleError from '../../../../lib/utils/error.ts';
import Loading from '../../../../components/shared/loading.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import { IProgress } from '../../../../lib/model/i-progress.ts';

const FooterSection = ({
  passApplicationIds,
  progress,
}: {
  passApplicationIds: number[];
  progress: IProgress;
}) => {
  const { saveEvaluation, sendEvaluationMail } = useAdminApi();

  const saveMutation = useMutation({
    mutationFn: () => {
      if (!passApplicationIds) throw new Error();
      return saveEvaluation({ passApplicationIds });
    },
  });

  const sendMutation = useMutation({
    mutationFn: sendEvaluationMail,
  });

  const { toast } = useToast();
  const dialogProps = useDialog();
  const handleSaveClick = async () => {
    try {
      await saveMutation.mutateAsync();
      toast({
        title: '임시저장이 완료되었습니다.',
        state: 'success',
      });
    } catch (e) {
      handleError(e, 'handleSaveClick', 'PRINT');
      toast({
        title: '예기치 못한 오류가 발생했습니다.',
        state: 'error',
      });
    }
  };

  const queryClient = useQueryClient();
  const handleSendConfirmClick = async () => {
    try {
      await saveMutation.mutateAsync();
      await sendMutation.mutateAsync();
      await queryClient.invalidateQueries({
        queryKey: ['recruitmentProgress'],
      });
      toast({
        title: '메일 전송이 완료되었습니다.',
        state: 'success',
      });
    } catch (e) {
      handleError(e, 'handleSendConfirmClick', 'PRINT');
      toast({
        title: '예기치 못한 오류가 발생했습니다.',
        state: 'error',
      });
    }
  };

  return (
    <>
      {saveMutation.isPending ||
      sendMutation.isPending ||
      queryClient.isFetching({ queryKey: ['recruitmentProgress'] }) ? (
        <Loading />
      ) : null}
      <FooterContainer className="flex w-full justify-end">
        <Button
          size="lg"
          disabled={progress === 'ANNOUNCED'}
          onClick={handleSaveClick}
        >
          임시 저장
        </Button>
        <Button
          size="lg"
          disabled={progress === 'ANNOUNCED'}
          onClick={() => dialogProps.toggleOpen()}
        >
          평가 완료
        </Button>
      </FooterContainer>
      <Dialog {...dialogProps} action={handleSendConfirmClick} className="w-96">
        <div className="flex flex-col gap-4">
          <p className="text-center text-2xl font-semibold text-crews-b05">
            합격 메일을 발송합니다 ✉️
          </p>
          <p className="text-base text-crews-bk01">
            메일 전송 후에도 지원서를 확인할 수 있지만 더 이상의 평가는 진행할
            수 없습니다.
          </p>
        </div>
      </Dialog>
    </>
  );
};

export default FooterSection;
