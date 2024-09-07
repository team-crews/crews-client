import { useToast } from '../../../../hooks/use-toast.ts';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input, { InputState } from '../../../../components/shared/input.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import { applicantLogin } from '../../../../apis/auth-api.ts';
import { printCustomError } from '../../../../lib/utils/error.ts';
import useSession from '../../../../hooks/use-session.ts';
import { useNavigate, useParams } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
} from '../../../../lib/utils/regex.ts';
import { LocalLegend } from '../../../sign-in/_components/lookup-recruitment-form.tsx';

type ApplyInputs = {
  email: string;
  password: string;
};

const ApplyForm = () => {
  const navigate = useNavigate();
  const { recruitmentCode } = useParams();

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
      const { accessToken, username } = await applicantLogin(data);

      if (recruitmentCode)
        localStorage.setItem('recruitmentCode', recruitmentCode);

      setSession(accessToken, username);
      navigate(`/apply/${recruitmentCode}`);
    } catch (e) {
      printCustomError(e, 'applicantLogin');

      const title = '예기치 못한 문제가 발생했습니다.';

      toast({
        title,
        state: 'error',
      });

      setError(true);
    }
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset className="mb-3">
        <LocalLegend>지원하기</LocalLegend>
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
        지원하기
      </Button>
    </form>
  );
};

export default ApplyForm;
