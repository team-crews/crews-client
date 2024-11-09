import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useSession from '../../hooks/use-session';
import { z } from 'zod';
import { RoleSchema } from '../../lib/schemas/role-schema.ts';

const AuthRedirectWrapper = ({
  availableRoles,
}: {
  availableRoles: z.infer<typeof RoleSchema>[];
}) => {
  const { accessToken, role } = useSession();
  const location = useLocation();

  if (!accessToken) {
    !location.state?.logout && alert('로그인이 필요한 페이지입니다.');
    return (
      <Navigate
        to="/sign-in"
        state={{
          loginType: location.pathname === '/recruit' ? 'ADMIN' : 'APPLICANT',
        }}
      />
    );
  }
  if (!availableRoles.includes(role)) {
    alert('허용되지 않은 페이지입니다.');
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AuthRedirectWrapper;
