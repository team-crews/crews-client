import Input from '../../components/shared/input.tsx';
import { Button } from '../../components/ui/button.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputState, LocalLegend } from './lookup-recruitment-form.tsx';
import { useToast } from '../../hooks/use-toast.tsx';
import { useState } from 'react';

type RecruitInputs = {
  recruitName: string;
  recruitPassword: string;
};

const RecruitForm = () => {
  const { toast } = useToast();
  const [error, setError] = useState<boolean>(false);

  const { register, resetField, handleSubmit, formState } =
    useForm<RecruitInputs>({
      defaultValues: {
        recruitName: '',
        recruitPassword: '',
      },
    });

  const onSubmit: SubmitHandler<RecruitInputs> = (data) => {
    /*
      ToDo
      * 길이 유효성 검사
      * 문자 유효성 검사
      * 로그인 처리
      * 페이지 네비게이션

      유효성 검사 어느정도로 할지 생각해봐야 할듯
     */

    toast({
      title: '문제가 발생했어요 😡',
      description: '다시 시도해주세요.',
    });

    setError(true);

    console.log(data);
  };

  const inputState: { recruitName: InputState; recruitPassword: InputState } = {
    recruitName: error
      ? 'error'
      : formState.dirtyFields.recruitName
        ? 'filled'
        : 'empty',
    recruitPassword: error
      ? 'error'
      : formState.dirtyFields.recruitPassword
        ? 'filled'
        : 'empty',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="mb-3">
        <LocalLegend>모집하기</LocalLegend>
        <Input
          state={inputState.recruitName}
          className="mb-3"
          registerReturns={register('recruitName', {
            onChange: () => {
              setError(false);
            },
          })}
          clearInput={() => {
            resetField('recruitName');
            setError(false);
          }}
          placeholder="동아리명"
        />
        <Input
          state={inputState.recruitPassword}
          type="password"
          registerReturns={register('recruitPassword', {
            onChange: () => {
              setError(false);
            },
          })}
          clearInput={() => {
            resetField('recruitPassword');
            setError(false);
          }}
          placeholder="비밀번호"
        />
      </fieldset>

      <Button className="w-full" disabled={error}>
        모집하기
      </Button>
    </form>
  );
};

export default RecruitForm;
