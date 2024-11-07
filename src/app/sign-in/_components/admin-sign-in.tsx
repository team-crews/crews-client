import Input from '../../../components/shared/input.tsx';
import { Button } from '../../../components/shadcn/button.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '../../../hooks/use-toast.ts';
import { useState } from 'react';
import { adminSignIn } from '../../../apis/auth-api.ts';
import { useNavigate } from 'react-router-dom';
import useSession from '../../../hooks/use-session.ts';
import { printCustomError } from '../../../lib/utils/error.ts';
import { findFirstErrorMessage } from '../../../lib/utils/utils.ts';
import Loading from '../../../components/shared/loading.tsx';
import {
  isFilledInput,
  isProperClubName,
  isProperPassword,
} from '../../../lib/utils/validation.ts';
import useAtomicMutation from '../../../hooks/use-atomic-mutation.ts';

type RecruitInputs = {
  clubName: string;
  password: string;
};

const AdminSignIn = () => {
  const { toast } = useToast();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setSession } = useSession();

  const { register, resetField, handleSubmit } = useForm<RecruitInputs>({
    defaultValues: {
      clubName: '',
      password: '',
    },
  });

  const mutation = useAtomicMutation({
    mutationFn: (data: RecruitInputs) => adminSignIn(data),
    requestName: 'adminSignIn',
  });

  const onSubmit: SubmitHandler<RecruitInputs> = async (data) => {
    try {
      const { accessToken, username } = await mutation.mutateAsync(data);
      setSession(accessToken, username);

      toast({
        title: `${username}님 환영합니다 😃`,
        state: 'success',
      });

      navigate('/recruit');
    } catch (e) {
      const errorStatus = printCustomError(e, 'adminLogin');

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
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <fieldset className="mb-3">
          <Input
            maxLength={30}
            state={error ? 'error' : 'default'}
            className="mb-3"
            registerReturns={register('clubName', {
              onChange: () => {
                setError(false);
              },
              validate: {
                validateIfFilled: (v) =>
                  isFilledInput(v, '이메일을 입력해주세요.'),
                validateIfProperClubName: (v) =>
                  isProperClubName(v, '잘못된 동아리명 형식입니다.'),
              },
            })}
            clearInput={() => {
              resetField('clubName');
              setError(false);
            }}
            placeholder="동아리명"
          />
          <Input
            maxLength={30}
            state={error ? 'error' : 'default'}
            type="password"
            registerReturns={register('password', {
              onChange: () => {
                setError(false);
              },
              validate: {
                validateIfFilled: (v) =>
                  isFilledInput(v, '이메일을 입력해주세요.'),
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
          모집하기
        </Button>
      </form>
    </>
  );
};

export default AdminSignIn;
