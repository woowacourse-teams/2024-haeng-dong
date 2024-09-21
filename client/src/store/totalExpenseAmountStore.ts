import {create} from 'zustand';

import {Step as StepType} from 'types/serviceType';

import {getTotalExpenseAmount} from '@utils/caculateExpense';

type State = {
  totalExpenseAmount: number;
};

type Action = {
  updateTotalExpenseAmount: (steps: StepType[]) => void;
};

export const useTotalExpenseAmountStore = create<State & Action>(set => ({
  totalExpenseAmount: 0,
  updateTotalExpenseAmount: (steps: StepType[]) => set({totalExpenseAmount: getTotalExpenseAmount(steps)}),
}));
