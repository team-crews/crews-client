import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/wrapper/toaster.tsx';
import HelpButton from '../components/shared/help-button.tsx';

const RootLayout = () => {
  return (
    <div className="h-dvh w-dvw">
      <Outlet />
      <Toaster />
      <HelpButton />
    </div>
  );
};

export default RootLayout;
