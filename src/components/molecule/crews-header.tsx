import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';
import CircleUserIcon from '../../assets/icons/circle-user-icon.svg?react';
import { Link, useLocation } from 'react-router-dom';
import useSession from '../../hooks/use-session.ts';
import { cn } from '../../lib/utils/utils.ts';
import { useToast } from '../../hooks/use-toast.ts';
import { printCustomError } from '../../lib/utils/error.ts';
import { useSignOut } from '../../apis/auth-api.ts';
import useAtomicMutation from '../../hooks/use-atomic-mutation.ts';
import { SidebarTrigger } from '../shadcn/sidebar.tsx';

const HeaderItems = [
  {
    title: '팀 모집',
    url: import.meta.env.VITE_TEAM_INTRODUCE,
  },
  {
    title: '안내서',
    url: import.meta.env.VITE_GUIDE_BOOK,
  },
  {
    title: '고객센터',
    url: import.meta.env.VITE_SLASHPAGE,
  },
];

const CrewsHeader = () => {
  const location = useLocation();

  const { accessToken, role, username, clearSession } = useSession();

  const { signOut } = useSignOut();
  const signOutMutation = useAtomicMutation({
    mutationFn: signOut,
    requestName: 'signOut',
  });

  const { toast } = useToast();

  const handleSignOutClick = async () => {
    try {
      await signOutMutation.mutateAsync();

      toast({
        title: `안녕히가세요 👋`,
        state: 'success',
      });

      clearSession();
      // FixMe
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      printCustomError(e, 'applicantLogin');

      toast({
        title: e?.response?.data?.message || '예기치 못한 문제가 발생했습니다.',
        state: 'error',
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-10 flex w-dvw items-center px-6 py-3',
        { 'border-b backdrop-blur': location.pathname !== '/' },
      )}
    >
      <div className="flex h-fit flex-1 items-center gap-10">
        <Link to="/" className="flex items-center gap-1 text-crews-b05">
          <AnchorIcon className="h-7 w-7" />
          <p className="text-3xl font-semibold">Crews</p>
        </Link>
        {HeaderItems.map((item, index) => (
          <a key={index} href={item.url} target="_blank">
            <p className="font-normal hover:underline">{item.title}</p>
          </a>
        ))}
      </div>

      <div
        className={cn({
          hidden: ['/sign-in', '/sign-up'].includes(location.pathname),
        })}
      >
        {accessToken ? (
          <div className="flex items-center gap-3 text-crews-bk01">
            <div className="flex items-center gap-2">
              <CircleUserIcon className="h-7 w-7" />
              <p className="font-medium">{`${role === 'ADMIN' ? '운영진' : '지원자'} | ${username}`}</p>
            </div>
            <button onClick={handleSignOutClick}>
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
            <SidebarTrigger />
          </div>
        )}
      </div>
    </header>
  );
};

export default CrewsHeader;
