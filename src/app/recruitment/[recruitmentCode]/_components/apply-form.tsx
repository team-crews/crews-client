import { useToast } from '../../../../hooks/use-toast.ts';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { InputState } from '../../../../components/shared/input.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import { applicantLogin } from '../../../../apis/auth-api.ts';
import handleError from '../../../../lib/utils/error.ts';
import useSession from '../../../../hooks/use-session.ts';
import { useNavigate, useParams } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
} from '../../../../lib/utils/regex.ts';

type ApplyInputs = {
  email: string;
  password: string;
};

const ApplyForm = () => {
  const navigate = useNavigate();
  const { 'recruitment-code': recruitmentCode } = useParams();

  const { toast } = useToast();
  const [error, setError] = useState<boolean>(false);

  const { setSession } = useSession();

  const { register, resetField, handleSubmit, formState } =
    useForm<ApplyInputs>({
      defaultValues: {
        email: '',
        password: '',
      },
    });

  const onSubmit: SubmitHandler<ApplyInputs> = async (data) => {
    const emailValidation = validateEmail(data.email);
    const passwordValidation = validatePassword(data.password);

    if (emailValidation || passwordValidation) {
      toast({
        title: emailValidation || passwordValidation,
        state: 'error',
      });
      setError(true);
      return;
    }

    try {
      const { accessToken } = await applicantLogin(data);

      setSession(accessToken);
      navigate(`/apply/${recruitmentCode}`);
    } catch (e) {
      handleError(e, 'applicantLogin', 'PRINT');

      const title = '예기치 못한 문제가 발생했습니다.';

      toast({
        title,
        state: 'error',
      });
    }

    toast({
      title: '문제가 발생했어요 😡',
      description: '다시 시도해주세요.',
    });

    setError(true);
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
