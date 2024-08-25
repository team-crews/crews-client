import { useToast } from '../../../../hooks/use-toast.tsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { InputState } from '../../../../components/shared/input.tsx';
import { Button } from '../../../../components/ui/button.tsx';

type ApplyInputs = {
  email: string;
  password: string;
};

const ApplyForm = () => {
  const { toast } = useToast();
  const [error, setError] = useState<boolean>(false);

  const { register, resetField, handleSubmit, formState } =
    useForm<ApplyInputs>({
      defaultValues: {
        email: '',
        password: '',
      },
    });

  const onSubmit: SubmitHandler<ApplyInputs> = (data) => {
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

  const inputState: Record<keyof ApplyInputs, InputState> = {
    email: error ? 'error' : formState.dirtyFields.email ? 'filled' : 'empty',
    password: error
      ? 'error'
      : formState.dirtyFields.password
        ? 'filled'
        : 'empty',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-4 text-center font-medium">
        <span className="text-2xl font-bold text-crews-b05">
          Crews 1기 기획진 모집
        </span>{' '}
        에 지원해 주세요 😃
      </p>
      <fieldset className="mb-3">
        <Input
          type="email"
          state={inputState.email}
          className="mb-3"
          registerReturns={register('email', {
            onChange: () => {
              setError(false);
            },
          })}
          clearInput={() => {
            resetField('email');
            setError(false);
          }}
          placeholder="이메일"
        />
        <Input
          state={inputState.password}
          type="password"
          registerReturns={register('password', {
            onChange: () => {
              setError(false);
            },
          })}
          clearInput={() => {
            resetField('password');
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

export default ApplyForm;
