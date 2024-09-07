import useBreakpoints from '../../hooks/use-breakpoints.ts';
import { Outlet } from 'react-router-dom';

import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';

const ResponsiveWrapper = () => {
  const { isSmaller } = useBreakpoints({ breakpoint: 'md' });

  return (
    <>
      {isSmaller && (
        <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-white">
          <div className="mb-6 flex flex-col">
            <p className="text-xl font-semibold">누구나 쉽게 모집 · 지원</p>
            <div className="flex items-center gap-2 font-bold text-crews-b05">
              <h1 className="text-6xl">Crews</h1>
              <AnchorIcon className="h-12 w-12" />
            </div>
            <p className="mt-10 text-lg font-semibold">
              죄송합니다. 데스크탑 혹은 노트북 화면으로 접속해주세요. 😢
            </p>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default ResponsiveWrapper;
