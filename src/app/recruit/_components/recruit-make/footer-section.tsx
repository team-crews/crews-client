import { Button } from '../../../../components/shadcn/button.tsx';
import FooterContainer from '../../../../components/shared/footer-container.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAdminApi from '../../../../apis/admin-api.ts';
import { ICreatedRecruitment } from '../../../../lib/types/models/i-recruitment.ts';
import { useToast } from '../../../../hooks/use-toast.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';
import { useFormContext } from 'react-hook-form';
import Loading from '../../../../components/shared/loading.tsx';
import CopyCodeButton from '../../../../components/shared/copy-code-button.tsx';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findFirstErrorMessage(errors: any): string | null {
  if (typeof errors === 'object' && errors !== null) {
    if (errors.message) {
      return errors.message;
    }

    // eslint-disable-next-line prefer-const
    for (let key in errors) {
      if (Array.isArray(errors[key])) {
        // eslint-disable-next-line prefer-const
        for (let item of errors[key]) {
          const message = findFirstErrorMessage(item);
          if (message) return message;
        }
      } else {
        const message = findFirstErrorMessage(errors[key]);
        if (message) return message;
      }
    }
  }

  return null;
}

const FooterSection = ({
  recruitmentCode = null,
}: {
  recruitmentCode?: string | null;
}) => {
  const { handleSubmit, reset } = useFormContext<ICreatedRecruitment>();

  const queryClient = useQueryClient();
  const { saveRecruitment, startRecruitment } = useAdminApi();

  const saveMutation = useMutation({
    mutationFn: (requestBody: ICreatedRecruitment) =>
      saveRecruitment(requestBody),
  });

  const startMutation = useMutation({
    mutationFn: startRecruitment,
  });

  const { toast } = useToast();
  const handleSaveRecruitmentClick = async (data: ICreatedRecruitment) => {
    try {
      const response = await saveMutation.mutateAsync(data);
      response.deadline = dayjs(response.deadline).format('YY-MM-DD-HH');
      reset(response);

      toast({
        title: '임시저장이 완료되었습니다.',
        state: 'success',
      });
    } catch (e) {
      printCustomError(e, 'handleStartRecruitmentClick');
      toast({
        title: '예기치 못한 문제가 발생했습니다.',
        state: 'error',
      });
    }
  };

  const handleStartRecruitmentClick = async (data: ICreatedRecruitment) => {
    try {
      reset(await saveMutation.mutateAsync(data));
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
      {saveMutation.isPending ||
      startMutation.isPending ||
      queryClient.isFetching({ queryKey: ['recruitmentProgress'] }) ? (
        <Loading />
      ) : null}
      <FooterContainer className="flex justify-end">
        {recruitmentCode && (
          <CopyCodeButton size="lg" variant="gray" code={recruitmentCode} />
        )}
        <Button
          size="lg"
          onClick={handleSubmit(
            handleSaveRecruitmentClick,
            handleFormRequirement,
          )}
          variant="gray"
        >
          저장하기
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
      </FooterContainer>
    </>
  );
};

export default FooterSection;
