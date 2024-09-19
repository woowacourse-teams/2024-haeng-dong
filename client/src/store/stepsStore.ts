import {create} from 'zustand';

import {Steps} from 'types/serviceType';

type State = {
  steps: Steps[];
};

type Action = {
  updateSteps: (stepList: State['steps']) => void;
};

export const useBillsStore = create<State & Action>(set => ({
  steps: [],
  updateSteps: steps => set(() => ({steps})),
}));
