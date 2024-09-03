import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useSession from '../../hooks/use-session';
import useRefreshToken from '../../hooks/use-refresh-token';
import handleError from '../../lib/utils/error';
import { validatePublicRoute } from '../../lib/utils/regex.ts';
import Header from '../shared/header.tsx';
import Loading from '../shared/loading.tsx';

const AuthRedirectWrapper = () => {
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
          handleError(e, 'redirectByAuth', 'PRINT');
          !validatePublicRoute(location.pathname) && navigate('/sign-in');
          setLoading(false);
        }
      }

      if (accessToken) {
        switch (role) {
          case 'ADMIN':
            location.pathname !== 'recruit' &&
              location.pathname !== 'error' &&
              navigate('/recruit');
            break;
          case 'APPLICANT':
            /**
             * FIXME: 해당 조건문이 존재할 시에 APPLICANT role을 가진 user가 무조건 /apply로 이동하게 됩니다.
             * user가 여러개의 application을 가질 경우, 특정 url로 navigate를 강제하는 로직이 자연스럽지 못하여 논의가 필요합니다.
             */
            // !/^\/apply\/.+$/.test(location.pathname) &&
            //   location.pathname !== 'error' &&
            //   navigate('/apply');
            break;
        }
        setLoading(false);
      }
    };

    (async () => await redirectByAuth())();
  }, [location.pathname, accessToken]);

  if (loading) return <Loading />;
  if (!accessToken) return <Outlet />;
  if (accessToken)
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
};

export default AuthRedirectWrapper;
