import useBreakpoints from '../../hooks/use-breakpoints.ts';
import { Outlet } from 'react-router-dom';

import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';

const MobileRestrictionWrapper = () => {
  const { isSmaller } = useBreakpoints({ breakpoint: 'md' });

  if (isSmaller)
    return (
      <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center gap-4 px-2">
          <p className="text-xl font-semibold">누구나 쉽게 모집 · 지원</p>
          <div className="flex items-center gap-2 font-bold text-crews-b05">
            <h1 className="text-6xl">Crews</h1>
            <AnchorIcon className="h-12 w-12" />
          </div>
          <p className="text-base font-normal">
            모집자 기능의 모바일 화면을 준비하고 있습니다 😰
          </p>
          <p className="text-base font-normal">
            데스크탑 혹은 노트북 환경에서 이용해주세요.
          </p>
        </div>
      </div>
    );
  else return <Outlet />;
};

export default MobileRestrictionWrapper;
