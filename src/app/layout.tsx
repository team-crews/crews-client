import { Outlet } from 'react-router-dom';

import Header from '../components/shared/Header.tsx';

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
