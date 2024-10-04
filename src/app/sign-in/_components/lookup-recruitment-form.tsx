import React, { useEffect, useState } from 'react';
import Input, { InputState } from '../../../components/shared/input.tsx';
import { Button } from '../../../components/shadcn/button.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '../../../hooks/use-toast.ts';
import { useNavigate } from 'react-router-dom';
import { validateRecruitmentCode } from '../../../lib/utils/regex.ts';

type LookUpRecruitmentInput = {
  recruitmentCode: string;
};

const LookupRecruitmentForm = () => {
  const { toast } = useToast();
  const [error, setError] = useState<boolean>(false);

  const { register, resetField, handleSubmit, setFocus, formState } =
    useForm<LookUpRecruitmentInput>({
      defaultValues: {
        recruitmentCode: '',
      },
    });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LookUpRecruitmentInput> = ({
    recruitmentCode,
  }) => {
    const toastMsg: string = validateRecruitmentCode(recruitmentCode);
    if (toastMsg) {
      toast({
        title: toastMsg,
        state: 'error',
      });
      setError(true);
      return;
    }
    navigate(`/recruitment/${recruitmentCode}`);
  };

  useEffect(() => {
    setFocus('recruitmentCode');
  }, [setFocus]);

  const inputState: InputState = error
    ? 'error'
    : formState.dirtyFields.recruitmentCode
      ? 'filled'
      : 'empty';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="mb-3">
        <LocalLegend>지원하기</LocalLegend>
        <Input
          maxLength={36}
          state={inputState}
          registerReturns={register('recruitmentCode', {
            onChange: () => {
              setError(false);
            },
          })}
          clearInput={() => {
            resetField('recruitmentCode');
            setError(false);
          }}
          placeholder="모집공고 코드"
        />
      </fieldset>
      <Button className="w-full" disabled={error}>
        지원하기
      </Button>
    </form>
  );
};

export const LocalLegend = ({ children }: { children: React.ReactNode }) => {
  return <legend className="mb-3 text-sm font-semibold">{children}</legend>;
};

export default LookupRecruitmentForm;
