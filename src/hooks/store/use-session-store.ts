import { IRole } from '../../lib/model/i-role.ts';
import { create } from 'zustand';

type State = {
  accessToken: string;
  role: IRole;
};

type Action = {
  updateAccessToken: (accessToken: State['accessToken']) => void;
  updateRole: (role: State['role']) => void;
  clearState: () => void;
};

const DEFAULT_SESSION: State = {
  accessToken: '',
  role: 'APPLICANT',
};

const useSessionStore = create<State & Action>((set) => ({
  ...DEFAULT_SESSION,
  updateAccessToken: (accessToken) => set(() => ({ accessToken })),
  updateRole: (role) => set(() => ({ role })),
  clearState: () => set(() => ({ ...DEFAULT_SESSION })),
}));

export default useSessionStore;
