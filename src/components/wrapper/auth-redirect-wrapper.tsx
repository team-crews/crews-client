import { Navigate, Outlet } from 'react-router-dom';
import useSession from '../../hooks/use-session';
import { IRole } from '../../lib/types/models/i-role.ts';

const AuthRedirectWrapper = ({
  availableRoles,
}: {
  availableRoles: IRole[];
}) => {
  const { accessToken, role } = useSession();

  if (!accessToken) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/sign-in" />;
  }
  if (!availableRoles.includes(role)) {
    alert('허용되지 않은 페이지입니다.');
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AuthRedirectWrapper;
