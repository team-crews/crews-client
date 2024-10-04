import { baseInstance } from '../apis/instance.ts';
import useSession from './use-session.ts';
import { throwCustomError } from '../lib/utils/error.ts';
import { ILoginResponse } from '../apis/i-response-body/i-response-body.ts';

const useRefreshToken = () => {
  const { setSession } = useSession();

  const refresh = async () => {
    try {
      const response = await baseInstance.post<ILoginResponse>(
        '/auth/refresh',
        {},
        {
          withCredentials: true,
        },
      );

      const { accessToken, username } = response.data;
      setSession(accessToken, username);
      return `Bearer ${accessToken}`;
    } catch (e) {
      throwCustomError(e, 'refresh');
    }
  };

  return { refresh };
};

export default useRefreshToken;
