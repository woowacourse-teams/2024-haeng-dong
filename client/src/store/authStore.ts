import {create} from 'zustand';

type State = {
  isAdmin: boolean;
};

type Action = {
  updateAuth: (isAdmin: boolean) => void;
};

export const useAuthStore = create<State & Action>(set => ({
  isAdmin: false,
  updateAuth: isAdmin => set(() => ({isAdmin})),
}));
