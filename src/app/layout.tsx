import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="mx-auto h-full max-w-[1080px]">
      <Outlet />
    </div>
  );
};

export default RootLayout;
