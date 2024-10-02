import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/wrapper/toaster.tsx';
import HelpSidebar from '../components/molecule/help-sidebar.tsx';
import Header from '../components/molecule/header.tsx';
import { TooltipProvider } from '../components/shadcn/tooltip.tsx';

const RootLayout = () => {
  return (
    <div className="h-dvh w-dvw">
      <TooltipProvider delayDuration={0}>
        <Header />
        <Outlet />
        <Toaster />
        <HelpSidebar />
      </TooltipProvider>
    </div>
  );
};

export default RootLayout;
