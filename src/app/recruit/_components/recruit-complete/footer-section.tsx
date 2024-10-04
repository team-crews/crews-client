import FooterContainer from '../../../../components/shared/footer-container.tsx';
import { Button } from '../../../../components/shadcn/button.tsx';
import Dialog from '../../../../components/shared/dialog.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../../hooks/use-toast.ts';
import useDialog from '../../../../hooks/use-dialog.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';
import Loading from '../../../../components/shared/loading.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import { IProgress } from '../../../../lib/types/models/i-progress.ts';

const url = import.meta.env.VITE_KAKAO_OPEN_CHAT;

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
      printCustomError(e, 'handleSaveClick');
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
      printCustomError(e, 'handleSendConfirmClick');
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
      <Dialog
        {...dialogProps}
        action={handleSendConfirmClick}
        className="w-80 p-4 text-center"
      >
        <div className="flex flex-col gap-4">
          <p className="text-center text-lg font-light">
            <span className="text-xl font-bold text-crews-b05">
              📮 합격 메일
            </span>{' '}
            을 발송합니다.
          </p>
          <p className="text-sm font-light text-crews-bk01">
            메일 전송 후에도 지원자들의 지원서를 <br />
            확인할 수 있지만
            <span className="font-bold"> 메일 재전송은 불가합니다.</span>
          </p>
          <p className="text-xs font-light text-crews-bk01">
            크루즈 서비스는 어떠셨나요?
            <br />
            <a href={url} className="text-crews-b05 underline" target="_blank">
              오픈채팅
            </a>
            에 피드백을 남겨주세요 🥹
          </p>
        </div>
      </Dialog>
    </>
  );
};

export default FooterSection;
