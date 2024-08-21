import {create} from 'zustand';

import {ConvertedAction} from 'types/serviceType';

type State = {
  stepList: ConvertedAction[];
};

type Action = {
  updateStepList: (stepList: State['stepList']) => void;
};

export const useStepListStore = create<State & Action>(set => ({
  stepList: [],
  updateStepList: stepList => set(() => ({stepList})),
}));
