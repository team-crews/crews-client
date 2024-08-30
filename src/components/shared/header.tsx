import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';
import CircleUserIcon from '../../assets/icons/circle-user-icon.svg?react';

const Header = () => {
  return (
    <header className="fixed left-0 top-0 flex w-full items-center justify-between bg-crews-b02 px-4 py-2">
      <div className="flex items-center gap-2 text-crews-b05">
        <AnchorIcon className="h-6 w-6" />
        <p className="text-2xl font-semibold">Crews</p>
      </div>
      <div className="flex items-center gap-3 text-crews-bk01">
        <div className="flex items-center gap-2">
          <CircleUserIcon className="h-6 w-6" />
          <p className="text-sm font-medium">운영진 | 크루즈 11기</p>
        </div>
        <button>
          <p className="text-xs font-light underline">로그아웃</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
