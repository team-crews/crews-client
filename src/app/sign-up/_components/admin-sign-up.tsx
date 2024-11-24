import { SubmitHandler, useForm } from 'react-hook-form';
import { adminSignUp } from '../../../apis/auth-api.ts';
import { useNavigate } from 'react-router-dom';
import useSession from '../../../hooks/use-session.ts';
import useAtomicMutation from '../../../hooks/use-atomic-mutation.ts';
import { useToast } from '../../../hooks/use-toast.ts';
import { useState } from 'react';
import { printCustomError } from '../../../lib/utils/error.ts';
import Loading from '../../../components/atom/loading.tsx';
import Input from '../../../components/atom/input.tsx';
import {
  isFilledInput,
  isProperId,
  isProperPassword,
} from '../../../lib/utils/validation.ts';
import { Button } from '../../../components/shadcn/button.tsx';
import { findFirstErrorMessage } from '../../../lib/utils/utils.ts';

const AdminSignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<boolean>(false);
  const { setSession } = useSession();

  const { register, resetField, handleSubmit } = useForm<AdminSignUpForm>({
    defaultValues: {
      clubName: '',
      password: '',
    },
  });

  const mutation = useAtomicMutation({
    mutationFn: (formData: AdminSignUpForm) => adminSignUp(formData),
    requestName: 'adminSignUp',
  });

  const onSubmit: SubmitHandler<AdminSignUpForm> = async (data) => {
    try {
      const { accessToken, username } = await mutation.mutateAsync(data);
      setSession(accessToken, username);

      toast({
        title: `${username}님 환영합니다 😃`,
        state: 'success',
      });

      navigate(`/`);

      // FixMe
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      printCustomError(e, 'applicantLogin');

      toast({
        title: e?.response?.data?.message || '예기치 못한 문제가 발생했습니다.',
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
            state={error ? 'error' : 'default'}
            className="mb-3"
            registerReturns={register('clubName', {
              onChange: () => {
                setError(false);
              },
              validate: {
                validateIfFilled: (v) =>
                  isFilledInput(v, '아이디를 입력해주세요.'),
                validateIfProperEmail: (v) =>
                  isProperId(v, '아이디는 영어와 숫자만을 포함해야 합니다.'),
              },
            })}
            clearInput={() => {
              resetField('clubName');
              setError(false);
            }}
            placeholder="아이디"
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
                  isProperPassword(
                    v,
                    '비밀번호는 8자 이상 32자 이하, 특수문자 포함, 띄어쓰기를 제외해야 합니다.',
                  ),
              },
            })}
            clearInput={() => {
              resetField('password');
              setError(false);
            }}
            placeholder="비밀번호"
          />
        </fieldset>

        {/*<a*/}
        {/*  href={import.meta.env.VITE_NEW_RECRUITER}*/}
        {/*  target="_blank"*/}
        {/*  className="flex items-center justify-center gap-2 rounded bg-[#2F3234] px-8 py-2 text-sm font-bold tracking-widest text-crews-w01 hover:bg-crews-bk02"*/}
        {/*>*/}
        {/*  <CommentIcon className="h-4 w-4" />*/}
        {/*  문의*/}
        {/*</a>*/}
        <Button
          className="w-full bg-[#2F3234] hover:bg-crews-bk02"
          disabled={error}
        >
          모집자 가입하기
        </Button>
      </form>
    </>
    // <>
    //   <a
    //     href={import.meta.env.VITE_NEW_RECRUITER}
    //     target="_blank"
    //     className="flex w-full items-center justify-center gap-2 rounded bg-[#2F3234] py-2 text-sm font-bold tracking-widest text-crews-w01 hover:bg-crews-bk02"
    //   >
    //     <CommentIcon className="h-4 w-4" />
    //     모집자 가입 문의
    //   </a>
    //   {import.meta.env.DEV && <DevAdminSignUp />}
    // </>
  );
};

/*
    ReadMe
    - This component should be only rendered on Dev Mode
   */
type AdminSignUpForm = {
  clubName: string;
  password: string;
};

// const DevAdminSignUp = () => {
//   const { register, handleSubmit } = useForm<AdminSignUpForm>({
//     defaultValues: {
//       clubName: '',
//       password: '',
//     },
//   });
//
//   const mutation = useAtomicMutation({
//     mutationFn: (data: AdminSignUpForm) => adminSignUp(data),
//     requestName: 'adminSignUp',
//   });
//
//   const navigate = useNavigate();
//   const { setSession } = useSession();
//
//   const onSubmit: SubmitHandler<AdminSignUpForm> = async (data) => {
//     try {
//       const { accessToken, username } = await mutation.mutateAsync(data);
//       setSession(accessToken, username);
//       navigate('/');
//     } catch (e) {
//       console.log(e);
//     }
//   };
//
//   if (!import.meta.env.DEV) return null;
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="fixed bottom-4 left-4 flex flex-col gap-4 border border-black bg-white p-4"
//     >
//       <p>동아리 생성!</p>
//       <input className="border border-black" {...register('clubName')} />
//       <input className="border border-black" {...register('password')} />
//       <button className="border border-crews-b05">create!</button>
//     </form>
//   );
// };

export default AdminSignUp;
