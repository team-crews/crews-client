import { baseInstance } from '../apis/instance.ts';
import useSession from './use-session.ts';
import { throwCustomError } from '../lib/utils/error.ts';

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
      throwCustomError(e, 'refresh');
    }
  };

  return { refresh };
};

export default useRefreshToken;
