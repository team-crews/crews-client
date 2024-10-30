import useSessionStore from './store/use-session-store.ts';

import { extractRole } from '../lib/utils/utils.ts';

const useSession = () => {
  const username = useSessionStore((state) => state.username);
  const accessToken = useSessionStore((state) => state.accessToken);
  const role = useSessionStore((state) => state.role);
  const updateUsername = useSessionStore((state) => state.updateUsername);
  const updateAccessToken = useSessionStore((state) => state.updateAccessToken);
  const updateRole = useSessionStore((state) => state.updateRole);
  const clearState = useSessionStore((state) => state.clearState);

  function setSession(accessToken: string, id: string) {
    clearSession();
    const role = extractRole(accessToken);

    updateUsername(id);
    updateAccessToken(`Bearer ${accessToken}`);
    updateRole(role);
  }

  function clearSession() {
    clearState();
  }

  return { username, accessToken, role, setSession, clearSession };
};

export default useSession;
