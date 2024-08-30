import useSessionStore from './store/use-session-store.ts';
import extractRole from '../lib/utils/jwt.ts';

const useSession = () => {
  const accessToken = useSessionStore((state) => state.accessToken);
  const role = useSessionStore((state) => state.role);
  const updateAccessToken = useSessionStore((state) => state.updateAccessToken);
  const updateRole = useSessionStore((state) => state.updateRole);
  const clearState = useSessionStore((state) => state.clearState);

  function setSession(accessToken: string) {
    const role = extractRole(accessToken);

    updateAccessToken(`Bearer ${accessToken}`);
    updateRole(role);
  }

  function clearSession() {
    clearState();
  }

  return { accessToken, role, setSession, clearSession };
};

export default useSession;
