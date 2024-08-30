import { baseInstance } from '../apis/instance.ts';
import useSession from './use-session.ts';
import handleError from '../lib/utils/error.ts';

const useRefreshToken = () => {
  const { setSession } = useSession();

  const refresh = async () => {
    try {
      const response = await baseInstance.post<{ accessToken: string }>(
        '/auth/refresh',
        {},
        {
          withCredentials: true,
        },
      );

      const accessToken = response.data.accessToken;
      setSession(accessToken);
      return `Bearer ${accessToken}`;
    } catch (e) {
      handleError(e, 'refresh', 'THROW');
    }
  };

  return { refresh };
};

export default useRefreshToken;
