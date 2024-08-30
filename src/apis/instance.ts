import axios from 'axios';
import useSession from '../hooks/use-session.ts';
import useRefreshToken from '../hooks/use-refresh-token.ts';
import { useEffect } from 'react';

const baseURL = import.meta.env.VITE_BASE_URL;

export const baseInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

const authInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const useAuthInstance = () => {
  const { accessToken, clearSession } = useSession();
  const { refresh } = useRefreshToken();

  useEffect(() => {
    const requestIntercept = authInstance.interceptors.request.use(
      (config) => {
        if (!config.headers?.Authorization)
          config.headers.Authorization = accessToken;

        return config;
      },
      (e) => {
        clearSession();
        return Promise.reject(e);
      },
    );

    const responseIntercept = authInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true; // Prevent Infinite Loop

          prevRequest.headers['Authorization'] = await refresh();
          return authInstance(prevRequest);
        }

        clearSession();
        return Promise.reject(error);
      },
    );

    return () => {
      authInstance.interceptors.request.eject(requestIntercept);
      authInstance.interceptors.response.eject(responseIntercept);
    };

    /*
      FixMe
      - dependency 비우는게 맞지 않나?
      - ESLint: React Hook useEffect has missing dependencies: 'accessToken' and 'refresh'. Either include them or remove the dependency array. (react-hooks/exhaustive-deps)
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authInstance };
};
export default useAuthInstance;
