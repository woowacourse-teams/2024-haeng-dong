import {create} from 'zustand';

type State = {
  isAdmin: boolean;
  isKakaoUser: boolean;
};

type Action = {
  updateAuth: (isAdmin: boolean) => void;
  updateKakaoAuth: (isKakaoUser: boolean) => void;
};

const initialState: State = {
  isAdmin: false,
  isKakaoUser: false,
};

export const useAuthStore = create<State & Action>(set => ({
  ...initialState,
  updateAuth: isAdmin => set(() => ({isAdmin})),
  updateKakaoAuth: isKakaoUser => set(() => ({isKakaoUser})),
}));
