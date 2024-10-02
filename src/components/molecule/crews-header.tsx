import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';
import CircleUserIcon from '../../assets/icons/circle-user-icon.svg?react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSession from '../../hooks/use-session.ts';
import { cn } from '../../lib/utils.ts';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../../hooks/use-toast.ts';
import { printCustomError } from '../../lib/utils/error.ts';
import { useLogout } from '../../apis/auth-api.ts';

const CrewsHeader = () => {
  const location = useLocation();
  const displayButtons = !(
    location.pathname === '/sign-in' || location.pathname === '/sign-up'
  );

  const { accessToken, role, username, clearSession } = useSession();

  const { logout } = useLogout();
  const logoutMutation = useMutation({ mutationFn: logout });

  const { toast } = useToast();
  const navigate = useNavigate();

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
    <header
      className={cn(
        'fixed left-0 top-0 z-10 flex w-dvw items-center border-b px-6 py-3 backdrop-blur',
        { 'border-b-0 backdrop-blur-none': location.pathname === '/' },
      )}
    >
      <div className="flex h-fit flex-1 gap-10">
        <Link to="/" className="flex items-center gap-1 text-crews-b05">
          <AnchorIcon className="h-7 w-7" />
          <p className="text-3xl font-semibold">Crews</p>
        </Link>
      </div>
      {displayButtons &&
        (accessToken ? (
          <div className="flex items-center gap-3 text-crews-bk01">
            <div className="flex items-center gap-2">
              <CircleUserIcon className="h-7 w-7" />
              <p className="font-medium">{`${role === 'ADMIN' ? '운영진' : '지원자'} | ${username}`}</p>
            </div>
            <button onClick={handleLogoutClick}>
              <p className="text-xs font-light underline">로그아웃</p>
            </button>
          </div>
        ) : (
          <div className="flex flex-1 justify-end gap-2">
            <Link
              to="/sign-in"
              className="rounded px-4 py-1 font-semibold text-crews-bk01 hover:bg-[#f0f0f0]"
            >
              로그인
            </Link>
            <Link
              to="/sign-up"
              className="rounded bg-crews-bk01 px-4 py-1 text-crews-w01 hover:opacity-70"
            >
              회원가입
            </Link>
          </div>
        ))}
    </header>
  );
};

export default CrewsHeader;
