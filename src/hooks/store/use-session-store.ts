import { create } from 'zustand';
import { z } from 'zod';
import { RoleSchema } from '../../lib/types/schemas/role-schema.ts';

type State = {
  username: string;
  accessToken: string;
  role: z.infer<typeof RoleSchema>;
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
  role: 'APPLICANT'
};

const useSessionStore = create<State & Action>((set) => ({
  ...DEFAULT_SESSION,
  updateUsername: (username: string) => set(() => ({ username })),
  updateAccessToken: (accessToken) => set(() => ({ accessToken })),
  updateRole: (role) => set(() => ({ role })),
  clearState: () => set(() => ({ ...DEFAULT_SESSION }))
}));

export default useSessionStore;
