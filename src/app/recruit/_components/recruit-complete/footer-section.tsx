import { Button } from '../../../../components/shadcn/button.tsx';
import CrewsDialog from '../../../../components/molecule/crews-dialog.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../../hooks/use-toast.ts';
import useDialog from '../../../../hooks/use-dialog.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';
import Loading from '../../../../components/shared/loading.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import CrewsFooter from '../../../../components/molecule/crews-footer.tsx';
import { z } from 'zod';
import { ProgressSchema } from '../../../../lib/types/schemas/progress-schema.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../../components/shadcn/tooltip.tsx';
import useAtomicMutation from '../../../../hooks/use-atomic-mutation.ts';

const url = import.meta.env.VITE_KAKAO_OPEN_CHAT;

const FooterSection = ({
  passApplicationIds,
  progress,
}: {
  passApplicationIds: number[];
  progress: z.infer<typeof ProgressSchema>;
}) => {
  const { saveEvaluation, sendEvaluationMail } = useAdminApi();

  const saveMutation = useAtomicMutation({
    mutationFn: () => {
      if (!passApplicationIds) throw new Error();
      return saveEvaluation({ passApplicationIds });
    },
    requestName: 'saveEvaluation',
  });

  const sendMutation = useAtomicMutation({
    mutationFn: sendEvaluationMail,
    requestName: 'sendEvaluationMail',
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
      <CrewsFooter>
        <Tooltip>
          <TooltipTrigger>
            <Button size="lg" disabled>
              CSV 추출
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>서비스 준비중 🙇🏻</p>
          </TooltipContent>
        </Tooltip>

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
      </CrewsFooter>
      <CrewsDialog
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
      </CrewsDialog>
    </>
  );
};

export default FooterSection;
