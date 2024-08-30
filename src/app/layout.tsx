import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/wrapper/toaster.tsx';

const RootLayout = () => {
  /*
    ToDo
    - 첫 서비스 로딩 시 간단한 시작 화면 있으면 나쁘지 않을지도..?
  */
  return (
    <div className="mx-auto h-full max-w-[1080px] border-x-[1px] border-[#f6f6f6]">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default RootLayout;
