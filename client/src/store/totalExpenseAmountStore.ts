import {create} from 'zustand';

type State = {
  totalExpenseAmount: number;
};

type Action = {
  updateTotalExpenseAmount: (totalExpenseAmount: State['totalExpenseAmount']) => void;
};

export const useTotalExpenseAmountStore = create<State & Action>(set => ({
  totalExpenseAmount: 0,
  updateTotalExpenseAmount: totalExpenseAmount => set(() => ({totalExpenseAmount})),
}));
