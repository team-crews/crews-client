import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/wrapper/toaster.tsx';
import HelpButton from '../components/shared/help-button.tsx';

const RootLayout = () => {
  return (
    // <div className="mx-auto h-full min-h-fit max-w-[1080px] border-x-[1px] border-[#f6f6f6]">
    <div className="h-dvh w-dvw">
      <Outlet />
      <Toaster />
      <HelpButton />
    </div>
  );
};

export default RootLayout;
