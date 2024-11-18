import useBreakpoints from '../../hooks/use-breakpoints.ts';
import { Outlet } from 'react-router-dom';

import AnchorIcon from '../../assets/icons/anchor-icon.svg?react';
import Container from '../atom/container.tsx';

const MobileRestrictionWrapper = () => {
  const { isSmaller } = useBreakpoints({ breakpoint: 'md' });

  return (
    <>
      {isSmaller && (
        <Container className="fixed left-0 top-0 z-50 flex items-center justify-center bg-white">
          <div className="mb-6 flex flex-col items-center px-8">
            <div>
              <p className="text-xl font-semibold">누구나 쉽게 모집 · 지원</p>
              <div className="flex items-center gap-2 font-bold text-crews-b05">
                <h1 className="text-6xl">Crews</h1>
                <AnchorIcon className="h-12 w-12" />
              </div>
            </div>
            <p className="mt-10 text-lg font-semibold">
              모집자 기능은 모바일 화면을 지원하지 않습니다.
            </p>
            <p className="text-lg font-semibold">
              데스크탑 혹은 노트북 환경에서 이용해주세요.
            </p>
          </div>
        </Container>
      )}
      <Outlet />
    </>
  );
};

export default MobileRestrictionWrapper;
