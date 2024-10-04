import { IRole } from '../../lib/types/models/i-role.ts';
import { create } from 'zustand';

type State = {
  username: string;
  accessToken: string;
  role: IRole;
};

type Action = {
  updateUsername: (id: State['username']) => void;
  updateAccessToken: (accessToken: State['accessToken']) => void;
  updateRole: (role: State['role']) => void;
  clearState: () => void;
};

const DEFAULT_SESSION: State = {
  username: '',
  accessToken: '',
  role: 'APPLICANT',
};

const useSessionStore = create<State & Action>((set) => ({
  ...DEFAULT_SESSION,
  updateUsername: (username: string) => set(() => ({ username })),
  updateAccessToken: (accessToken) => set(() => ({ accessToken })),
  updateRole: (role) => set(() => ({ role })),
  clearState: () => set(() => ({ ...DEFAULT_SESSION })),
}));

export default useSessionStore;
