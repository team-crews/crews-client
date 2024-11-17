import { useEffect } from 'react';

const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // 스크롤 비활성화
      document.body.style.overflow = 'hidden';
    } else {
      // 스크롤 활성화
      document.body.style.overflow = '';
    }

    // Cleanup: 컴포넌트 언마운트 시 스크롤 상태 복원
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
};

export default useScrollLock;
