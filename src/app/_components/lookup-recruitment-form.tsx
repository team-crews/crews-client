import React, { useEffect, useState } from 'react';
import Input, { InputState } from '../../components/shared/input.tsx';
import { Button } from '../../components/ui/button.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '../../hooks/use-toast.tsx';
import { useNavigate } from 'react-router-dom';

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
    /*
      ToDo
      * 길이 유효성 검사
      * 문자 유효성 검사

      recruitment id는 "d6d46725-0297-442e-b942-f2b898437680"와 같은 식으로 정해진 길이 및 정해진 문자만을 포함한다.
      길이 및 문자 정도의 유효성 검사만을 수행해 서버에 부하를 줄여보자.
     */

    const isError = false;
    setError(isError);

    !isError && navigate(`/recruitment/${recruitmentCode}`);

    isError &&
      toast({
        title: '문제가 발생했어요 😡',
        description: '다시 시도해주세요.',
      });
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
