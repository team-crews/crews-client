import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/wrapper/toaster.tsx';
import CrewsHeader from '../components/molecule/crews-header.tsx';
import { TooltipProvider } from '../components/shadcn/tooltip.tsx';
import HelpSidebar from '../components/molecule/help-sidebar.tsx';

const RootLayout = () => {
  return (
    <div className="h-dvh w-dvw">
      <TooltipProvider delayDuration={0}>
        <CrewsHeader />
        <Outlet />
        <Toaster />
        <HelpSidebar />
      </TooltipProvider>
    </div>
  );
};

export default RootLayout;
