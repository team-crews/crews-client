import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-10 flex w-dvw items-center justify-between px-4 py-4">
      <Link to="/" className="flex items-center gap-1 text-crews-b05">
        <AnchorIcon className="h-5 w-5" />
        <p className="text-2xl font-semibold">Crews</p>
      </Link>
      <div className="flex gap-2">
        <Link
          to="/"
          className="text hover:bg- rounded px-4 py-1 font-semibold text-crews-bk01 hover:bg-[#f0f0f0]"
        >
          로그인
        </Link>
        <Link
          to="/"
          className="rounded bg-crews-bk01 px-4 py-1 text-crews-w01 hover:opacity-70"
        >
          회원가입
        </Link>
      </div>
    </header>
  );
};

export default Header;
