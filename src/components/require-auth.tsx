import { IRole } from '../lib/model/i-role.ts';
import { Outlet } from 'react-router-dom';

const RequireAuth = ({ availableRoles }: { availableRoles: IRole[] }) => {
  // const { auth } = useAuth();
  // const currentLocation = useLocation();
  // const available = auth?.roles?.filter((it) => availRole.includes(it))?.length;

  // if (!auth?.accessToken)
  //   return (
  //     <Navigate
  //       to={redirectUrl}
  //       state={{ from: currentLocation }}
  //       replace={true}
  //     />
  //   );
  // else if (!available) return <UnauthenticatedPage />;
  // else if (available)
  //   return (
  //     <>
  //       <AuthHeader />
  //       <Outlet />
  //     </>
  //   );

  return (
    <>
      {availableRoles.map((role: IRole) => (
        // TODO: remove role
        <p>{role}만 출입 가능 </p>
      ))}
      <Outlet />
    </>
  );
};

export default RequireAuth;
