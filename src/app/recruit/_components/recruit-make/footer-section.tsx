import { Button } from '../../../../components/shadcn/button.tsx';
import { useQueryClient } from '@tanstack/react-query';
import useAdminApi from '../../../../apis/admin-api.ts';
import { useToast } from '../../../../hooks/use-toast.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';
import { useFormContext } from 'react-hook-form';
import Loading from '../../../../components/shared/loading.tsx';
import { findFirstErrorMessage } from '../../../../lib/utils/utils.ts';
import { z } from 'zod';
import {
  CreatedRecruitmentSchema,
  RecruitmentSchema,
} from '../../../../lib/types/schemas/recruitment-schema.ts';
import { convertDateAndTimeToDeadline } from '../../../../lib/utils/convert.ts';
import CrewsFooter from '../../../../components/molecule/crews-footer.tsx';
import { SaveRecruitmentRequestSchema } from '../../../../apis/response-body-schema.ts';
import useAtomicMutation from '../../../../hooks/use-atomic-mutation.ts';

const FooterSection = ({
  updateRecruitment,
}: {
  updateRecruitment: (data: z.infer<typeof RecruitmentSchema>) => void;
}) => {
  const { handleSubmit } =
    useFormContext<z.infer<typeof CreatedRecruitmentSchema>>();

  const queryClient = useQueryClient();
  const { saveRecruitment, startRecruitment } = useAdminApi();

  const saveMutation = useAtomicMutation({
    mutationFn: (requestBody: z.infer<typeof SaveRecruitmentRequestSchema>) =>
      saveRecruitment(requestBody),
    requestName: 'saveRecruitment',
  });

  const startMutation = useAtomicMutation({
    mutationFn: startRecruitment,
    requestName: 'startRecruitment',
  });

  const { toast } = useToast();
  const handleSaveRecruitmentClick = async (
    data: z.infer<typeof CreatedRecruitmentSchema>,
  ) => {
    try {
      updateRecruitment(
        await saveMutation.mutateAsync({
          ...data,
          deadline: convertDateAndTimeToDeadline({
            deadlineDate: data.deadlineDate,
            deadlineTime: data.deadlineTime,
          }),
        }),
      );

      toast({
        title: '임시저장이 완료되었습니다.',
        state: 'success',
      });
    } catch (e) {
      printCustomError(e, 'handleSaveRecruitmentClick');
      toast({
        title: '예기치 못한 문제가 발생했습니다.',
        state: 'error',
      });
    }
  };

  const handleStartRecruitmentClick = async (
    data: z.infer<typeof CreatedRecruitmentSchema>,
  ) => {
    try {
      updateRecruitment(
        await saveMutation.mutateAsync({
          ...data,
          deadline: convertDateAndTimeToDeadline({
            deadlineDate: data.deadlineDate,
            deadlineTime: data.deadlineTime,
          }),
        }),
      );
      await startMutation.mutateAsync();
      await queryClient.invalidateQueries({
        queryKey: ['recruitmentProgress'],
      });
    } catch (e) {
      printCustomError(e, 'handleStartRecruitmentClick');
      toast({
        title: '예기치 못한 문제가 발생했습니다.',
        state: 'error',
      });
    }
  };

  const handleFormRequirement = (errors: object) => {
    const msg = findFirstErrorMessage(errors);

    msg &&
      toast({
        title: msg,
        state: 'information',
      });
  };

  return (
    <>
      {(saveMutation.isPending || startMutation.isPending) && <Loading />}
      <CrewsFooter>
        <Button
          size="lg"
          onClick={handleSubmit(
            handleSaveRecruitmentClick,
            handleFormRequirement,
          )}
          variant="black"
        >
          임시 저장
        </Button>
        <Button
          size="lg"
          onClick={handleSubmit(
            handleStartRecruitmentClick,
            handleFormRequirement,
          )}
        >
          모집 시작
        </Button>
      </CrewsFooter>
    </>
  );
};

export default FooterSection;
