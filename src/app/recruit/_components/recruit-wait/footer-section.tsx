import { Button } from '../../../../components/shadcn/button.tsx';
import { useQueryClient } from '@tanstack/react-query';
import CrewsDialog from '../../../../components/molecule/crews-dialog.tsx';
import useDialog from '../../../../hooks/use-dialog.ts';
import { useForm } from 'react-hook-form';
import {
  isFilledInput,
  isProperTime,
} from '../../../../lib/utils/validation.ts';
import { useToast } from '../../../../hooks/use-toast.ts';
import useAdminApi from '../../../../apis/admin-api.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';
import {
  convertDateAndTimeToDeadline,
  convertDeadlineToDateAndTime,
} from '../../../../lib/utils/convert.ts';
import { findFirstErrorMessage } from '../../../../lib/utils/utils.ts';
import { z } from 'zod';
import { DateAndTimeSchema } from '../../../../lib/types/schemas/recruitment-schema.ts';
import React from 'react';
import CrewsFooter from '../../../../components/molecule/crews-footer.tsx';
import Loading from '../../../../components/shared/loading.tsx';
import useAtomicMutation from '../../../../hooks/use-atomic-mutation.ts';
import REQUEST_ID from '../../../../apis/request-id.ts';

const times = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, '0')}:00`,
);

const FooterSection = ({
  recruiting,
  deadline,
}: {
  recruiting: boolean;
  deadline: string;
}) => {
  const queryClient = useQueryClient();
  const { changeDeadline } = useAdminApi();
  const { toast } = useToast();
  const dialogReturns = useDialog();

  const handleEvaluateRecruitmentClick = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['recruitmentProgress'],
    });
  };

  const { register, handleSubmit, getValues } = useForm<
    z.infer<typeof DateAndTimeSchema>
  >({
    defaultValues: convertDeadlineToDateAndTime(deadline),
  });

  const changeMutation = useAtomicMutation({
    mutationFn: changeDeadline,
    requestId: REQUEST_ID.changeDeadline,
  });

  const onSubmit = async (data: z.infer<typeof DateAndTimeSchema>) => {
    try {
      await changeMutation.mutateAsync(data);
      await queryClient.invalidateQueries({
        queryKey: ['recruitmentInProgressDetail'],
      });
      dialogReturns.toggleOpen();
    } catch (e) {
      printCustomError(e, 'onSubmit');
      toast({
        title: '예상하지 못한 오류가 발생하였습니다.',
        state: 'error',
      });
    }
  };

  const onError = (errors: object) => {
    const msg = findFirstErrorMessage(errors);

    msg &&
      toast({
        title: msg,
        state: 'information',
      });
  };

  return (
    <>
      {changeMutation.isPending && <Loading />}
      <CrewsFooter>
        <Button size="lg" onClick={() => dialogReturns.toggleOpen()}>
          마감기간 연장
        </Button>

        <Button
          size="lg"
          disabled={recruiting}
          onClick={handleEvaluateRecruitmentClick}
        >
          지원서 평가
        </Button>
      </CrewsFooter>
      <CrewsDialog {...dialogReturns} action={handleSubmit(onSubmit, onError)}>
        <div className="mb-6 flex flex-col gap-2 text-center">
          <p className="text-2xl font-semibold">⏰ 마감 기간 연장</p>
          <p className="text-sm font-light">
            기간 연장 후 단축은 불가능하니 주의해주세요.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="w-full">
            <Label>마감 일자</Label>
            <input
              {...register('deadlineDate', {
                validate: {
                  validateIfFilled: (v) =>
                    isFilledInput(v, '마감 일자가 선택되지 않았어요.'),
                },
              })}
              className="w-full text-base text-crews-bk01 placeholder:text-crews-g03"
              type="date"
            />
          </div>

          <div className="w-full">
            <Label>마감 시간</Label>
            <select
              className="-ml-1 w-full text-base"
              {...register('deadlineTime', {
                validate: {
                  validateIfFilled: (v) =>
                    isFilledInput(v, '마감 시간이 선택되지 않았어요.'),
                  validateIfProperTime: (v) => {
                    if (!getValues('deadlineDate')) return '';

                    return isProperTime(
                      deadline,
                      convertDateAndTimeToDeadline({
                        deadlineDate: getValues('deadlineDate'),
                        deadlineTime: v,
                      }),
                      '마감 기간은 연장만 가능합니다.',
                    );
                  },
                },
              })}
              defaultValue=""
            >
              <option value="" disabled hidden>
                마감 시간을 선택해주세요.
              </option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CrewsDialog>
    </>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="mb-2 w-full text-sm font-bold text-crews-b06">{children}</p>
  );
};

export default FooterSection;
