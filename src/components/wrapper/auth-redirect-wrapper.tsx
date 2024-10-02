import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useSession from '../../hooks/use-session';
import useRefreshToken from '../../hooks/use-refresh-token';
import { printCustomError } from '../../lib/utils/error';
import Loading from '../shared/loading.tsx';
import { IRole } from '../../lib/types/models/i-role.ts';

const AuthRedirectWrapper = ({
  availableRoles,
}: {
  availableRoles: IRole[];
}) => {
  const [loading, setLoading] = useState(true);
  const { accessToken, role } = useSession();
  const { refresh } = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirectByAuth = async () => {
      if (!accessToken) {
        try {
          await refresh();
        } catch (e) {
          printCustomError(e, 'redirectByAuth');
          alert('로그인이 필요합니다.');
          navigate('/sign-in');
          setLoading(false);
        }
      }

      if (accessToken) {
        if (!availableRoles.includes(role)) {
          alert('허용되지 않은 페이지입니다.');
          navigate('/');
        }
        setLoading(false);
      }
    };

    (async () => await redirectByAuth())();
  }, [location.pathname, accessToken]);

  if (loading) return <Loading />;
  return <Outlet />;
};

export default AuthRedirectWrapper;
