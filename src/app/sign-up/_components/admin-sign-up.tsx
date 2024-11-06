import CommentIcon from '../../../assets/icons/comment-icon.svg?react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { adminSignUp } from '../../../apis/auth-api.ts';
import { useNavigate } from 'react-router-dom';
import useSession from '../../../hooks/use-session.ts';
import useAtomicMutation from '../../../hooks/use-atomic-mutation.ts';
import REQUEST_ID from '../../../apis/request-id.ts';

const AdminSignUp = () => {
  return (
    <>
      <a
        href={import.meta.env.VITE_KAKAO_ADMIN_CHAT}
        target="_blank"
        className="flex w-full items-center justify-center gap-2 rounded bg-[#2F3234] py-2 text-sm font-bold tracking-widest text-crews-w01 hover:bg-crews-bk02"
      >
        <CommentIcon className="h-4 w-4" />
        모집자 가입 문의
      </a>
      {import.meta.env.DEV && <DevAdminSignUp />}
    </>
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

const DevAdminSignUp = () => {
  const { register, handleSubmit } = useForm<AdminSignUpForm>({
    defaultValues: {
      clubName: '',
      password: '',
    },
  });

  const mutation = useAtomicMutation({
    mutationFn: (data: AdminSignUpForm) => adminSignUp(data),
    requestId: REQUEST_ID.adminSignUp,
  });

  const navigate = useNavigate();
  const { setSession } = useSession();

  const onSubmit: SubmitHandler<AdminSignUpForm> = async (data) => {
    try {
      const { accessToken, username } = await mutation.mutateAsync(data);
      setSession(accessToken, username);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  if (!import.meta.env.DEV) return null;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed bottom-4 left-4 flex flex-col gap-4 border border-black bg-white p-4"
    >
      <p>동아리 생성!</p>
      <input className="border border-black" {...register('clubName')} />
      <input className="border border-black" {...register('password')} />
      <button className="border border-crews-b05">create!</button>
    </form>
  );
};

export default AdminSignUp;
