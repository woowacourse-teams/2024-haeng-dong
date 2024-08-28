import {create} from 'zustand';

type State = {
  appError: Error | null;
};

type Action = {
  updateAppError: (appError: State['appError']) => void;
};

export const useAppErrorStore = create<State & Action>(set => ({
  appError: null,
  updateAppError: appError => set(() => ({appError})),
}));
