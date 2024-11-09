import { Outlet } from 'react-router-dom';
import { Toaster } from '../components/wrapper/toaster.tsx';
import CrewsHeader from '../components/molecule/crews-header.tsx';
import { TooltipProvider } from '../components/shadcn/tooltip.tsx';

const RootLayout = () => {
  return (
    <div className="w-dvw">
      <TooltipProvider delayDuration={0}>
        <CrewsHeader />
        <Outlet />
        <Toaster />
      </TooltipProvider>
    </div>
  );
};

export default RootLayout;
