import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const displayButtons = !(
    location.pathname === '/sign-in' || location.pathname === '/sign-up'
  );

  return (
    <header className="fixed left-0 top-0 z-10 flex w-dvw items-center px-6 py-4">
      <div className="flex h-fit flex-1 gap-10">
        <Link to="/" className="flex items-center gap-1 text-crews-b05">
          <AnchorIcon className="h-7 w-7" />
          <p className="text-3xl font-semibold">Crews</p>
        </Link>
      </div>
      {displayButtons && (
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
      )}
    </header>
  );
};

export default Header;
