import { useEffect, useState } from 'react';
import Loading from '../atom/loading.tsx';
import useRefreshToken from '../../hooks/use-refresh-token.ts';
import { printCustomError } from '../../lib/utils/error.ts';
import { Outlet } from 'react-router-dom';
import useSession from '../../hooks/use-session.ts';

/*
  ToDo
  - 나중에 accessToken 시간 확 줄여서 테스트
 */

const TryLoginWrapper = () => {
  const [loading, setLoading] = useState(true);
  const { refresh } = useRefreshToken();
  const { clearSession } = useSession();

  useEffect(() => {
    const redirectByAuth = async () => {
      try {
        await refresh();
      } catch (e) {
        clearSession();
        printCustomError(e, 'redirectByAuth');
      } finally {
        setLoading(false);
      }
    };

    (async () => await redirectByAuth())();
  }, []);

  if (loading) return <Loading />;
  return <Outlet />;
};

export default TryLoginWrapper;
