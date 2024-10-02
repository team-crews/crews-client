import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/wrapper/toaster.tsx';
import HelpSidebar from '../components/molecule/help-sidebar.tsx';

const RootLayout = () => {
  return (
    <div className="h-dvh w-dvw">
      <Outlet />
      <Toaster />
      <HelpSidebar />
    </div>
  );
};

export default RootLayout;
