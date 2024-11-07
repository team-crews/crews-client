import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/use-toast.ts';
import { useState } from 'react';
import useSession from '../../../hooks/use-session.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../components/atom/input.tsx';
import { Button } from '../../../components/shadcn/button.tsx';
import { applicantSignIn } from '../../../apis/auth-api.ts';
import { printCustomError } from '../../../lib/utils/error.ts';
import {
  isFilledInput,
  isProperEmail,
  isProperPassword,
} from '../../../lib/utils/validation.ts';
import { findFirstErrorMessage } from '../../../lib/utils/utils.ts';
import Loading from '../../../components/atom/loading.tsx';
import useAtomicMutation from '../../../hooks/use-atomic-mutation.ts';

type ApplyInputs = {
  email: string;
  password: string;
};

const ApplicantSignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<boolean>(false);

  const { setSession } = useSession();

  const { register, resetField, handleSubmit } = useForm<ApplyInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useAtomicMutation({
    mutationFn: (formData: ApplyInputs) => applicantSignIn(formData),
    requestName: 'applicantSignIn',
  });

  const onSubmit: SubmitHandler<ApplyInputs> = async (data) => {
    try {
      const { accessToken, username } = await mutation.mutateAsync(data);
      setSession(accessToken, username);

      toast({
        title: `${username}님 환영합니다 😃`,
        state: 'success',
      });

      navigate(`/`);
    } catch (e) {
      const errorStatus = printCustomError(e, 'applicantLogin');

      let title = '예기치 못한 문제가 발생했습니다.';
      if (errorStatus === 401) title = '잘못된 비밀번호입니다.';

      toast({
        title,
        state: 'error',
      });

      setError(true);
    }
  };

  const onError = (errors: object) => {
    const msg = findFirstErrorMessage(errors);

    msg &&
      toast({
        title: msg,
        state: 'information',
      });
    setError(true);
  };

  return (
    <>
      {mutation.isPending && <Loading />}
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <fieldset className="mb-3">
          <Input
            maxLength={50}
            state={error ? 'error' : 'default'}
            className="mb-3"
            registerReturns={register('email', {
              onChange: () => {
                setError(false);
              },
              validate: {
                validateIfFilled: (v) =>
                  isFilledInput(v, '이메일을 입력해주세요.'),
                validateIfProperEmail: (v) =>
                  isProperEmail(v, '잘못된 이메일 형식입니다.'),
              },
            })}
            clearInput={() => {
              resetField('email');
              setError(false);
            }}
            placeholder="이메일"
          />
          <Input
            state={error ? 'error' : 'default'}
            type="password"
            registerReturns={register('password', {
              onChange: () => {
                setError(false);
              },
              validate: {
                validateIfFilled: (v) =>
                  isFilledInput(v, '비밀번호를 입력해주세요.'),
                validateIfProperPW: (v) =>
                  isProperPassword(v, '잘못된 비밀번호 형식입니다.'),
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
    </>
  );
};

export default ApplicantSignIn;
