import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useSession from '../../hooks/use-session';
import { z } from 'zod';
import { RoleSchema } from '../../lib/types/schemas/role-schema.ts';
import { useToast } from '../../hooks/use-toast.ts';

const AuthRedirectWrapper = ({
  availableRoles,
}: {
  availableRoles: z.infer<typeof RoleSchema>[];
}) => {
  const { accessToken, role } = useSession();
  const location = useLocation();

  const { toast } = useToast();
  if (!accessToken) {
    {
      !location.state?.logout &&
        toast({
          title: '로그인이 필요한 페이지입니다.',
          state: 'warning',
        });
    }

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
    toast({
      title: '허용되지 않은 페이지입니다.',
      state: 'warning',
    });

    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AuthRedirectWrapper;
