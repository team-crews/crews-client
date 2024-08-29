import { Outlet } from 'react-router-dom';
import useSession from '../../hooks/use-session.ts';
import { useEffect, useState } from 'react';
import useRefreshToken from '../../hooks/use-refresh-token.ts';
import handleError from '../../lib/utils/error.ts';

const PersistLogin = () => {
  /*
    ToDo
    - react query 로 로직 변경 필요
   */
  const [loading, setLoading] = useState<boolean>(true);
  const { accessToken, role } = useSession();
  const { refresh } = useRefreshToken();

  const persistLogin = async () => {
    try {
      await refresh();
    } catch (e) {
      handleError(e, 'persistLogin', 'PRINT');
    }
  };

  useEffect(() => {
    !!(accessToken || role) &&
      (async function () {
        await persistLogin();
      })();
    setLoading(false);
  }, []);

  /*
    ToDo
    - loading 관련 처리 필요
   */
  if (loading) return <div>Trying to persist login</div>;
  return <Outlet />;
};

export default PersistLogin;
