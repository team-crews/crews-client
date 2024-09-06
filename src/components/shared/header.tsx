import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';
import CircleUserIcon from '../../assets/icons/circle-user-icon.svg?react';
import { useMutation } from '@tanstack/react-query';
import { useLogout } from '../../apis/auth-api.ts';
import { printCustomError } from '../../lib/utils/error.ts';
import { useToast } from '../../hooks/use-toast.ts';
import Loading from './loading.tsx';
import { useNavigate } from 'react-router-dom';
import useSession from '../../hooks/use-session.ts';

const Header = () => {
  const { logout } = useLogout();
  const logoutMutation = useMutation({ mutationFn: logout });

  const { toast } = useToast();
  const navigate = useNavigate();

  const { clearSession, username, role } = useSession();
  const handleLogoutClick = async () => {
    try {
      await logoutMutation.mutateAsync();
      clearSession();
      navigate('/sign-in');
    } catch (e) {
      printCustomError(e, 'handleLogoutClick');
      toast({
        title: '예기치 못한 문제가 발생하였습니다.',
        state: 'error',
      });
    }
  };

  return (
    <>
      {logoutMutation.isPending ? <Loading /> : null}
      <header className="fixed left-0 top-0 z-10 flex w-full items-center justify-between bg-crews-b02 px-4 py-2">
        <div className="flex items-center gap-2 text-crews-b05">
          <AnchorIcon className="h-6 w-6" />
          <p className="text-2xl font-semibold">Crews</p>
        </div>
        <div className="flex items-center gap-3 text-crews-bk01">
          <div className="flex items-center gap-2">
            <CircleUserIcon className="h-6 w-6" />
            <p className="text-sm font-medium">{`${role === 'ADMIN' ? '운영진' : '지원자'} | ${username}`}</p>
          </div>
          <button onClick={handleLogoutClick}>
            <p className="text-xs font-light underline">로그아웃</p>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
