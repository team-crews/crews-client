import CopyCodeButton from '../../../../components/shared/copy-code-button.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import FooterContainer from '../../../../components/shared/footer-container.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Dialog from '../../../../components/shared/dialog.tsx';
import useDialog from '../../../../hooks/use-dialog.ts';
import { useForm } from 'react-hook-form';
import {
  isFilledInput,
  isProperNewDeadline,
} from '../../../../lib/utils/validation.ts';
import { useToast } from '../../../../hooks/use-toast.ts';
import useAdminApi from '../../../../apis/admin-api.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';

type FormType = { deadline: string };

const FooterSection = ({
  recruiting,
  recruitmentCode,
  deadline,
}: {
  recruiting: boolean;
  recruitmentCode: string;
  deadline: string;
}) => {
  const queryClient = useQueryClient();
  const handleEvaluateRecruitmentClick = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['recruitmentProgress'],
    });
  };

  const dialogProps = useDialog();

  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: { deadline: '' },
  });

  const { changeDeadline } = useAdminApi();
  const changeMutation = useMutation({ mutationFn: changeDeadline });

  const { toast } = useToast();
  const onSubmit = async (data: FormType) => {
    try {
      await changeMutation.mutateAsync(data);
      await queryClient.invalidateQueries({
        queryKey: ['recruitmentInProgressDetail'],
      });
    } catch (e) {
      printCustomError(e, 'onSubmit');
      toast({
        title: '예상하지 못한 오류가 발생하였습니다.',
        state: 'error',
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    error.deadline.message &&
      toast({
        title: error.deadline.message,
        state: 'information',
      });
  };

  return (
    <>
      <FooterContainer className="flex w-full justify-end">
        <div className="flex items-center gap-4">
          <CopyCodeButton variant="gray" size="lg" code={recruitmentCode} />
          {recruiting ? (
            <Button size="lg" onClick={() => dialogProps.toggleOpen()}>
              마감기간 연장
            </Button>
          ) : (
            <Button size="lg" onClick={handleEvaluateRecruitmentClick}>
              지원서 평가
            </Button>
          )}
        </div>
      </FooterContainer>
      <Dialog {...dialogProps} action={handleSubmit(onSubmit, onError)}>
        <div className="w-full">
          <p className="mb-2 w-full text-sm font-bold text-crews-b06">
            마감 일자
          </p>
          <div className="flex gap-2">
            <input
              maxLength={11}
              placeholder="마감 일자 : YY-MM-DD-HH"
              className="w-full text-base text-crews-bk01 placeholder:text-crews-g03"
              {...register('deadline', {
                validate: {
                  isFilledInput: (v) =>
                    isFilledInput(v, '마감 시간이 작성되지 않았어요.'),
                  isProperNewDeadline: (v) => isProperNewDeadline(v, deadline),
                },
              })}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default FooterSection;
