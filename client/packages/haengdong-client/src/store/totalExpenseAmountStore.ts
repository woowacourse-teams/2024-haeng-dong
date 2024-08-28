import {create} from 'zustand';

import {BillStep, MemberStep} from 'types/serviceType';

import {getTotalExpenseAmount} from '@utils/caculateExpense';

type State = {
  totalExpenseAmount: number;
};

type Action = {
  updateTotalExpenseAmount: (stepList: (MemberStep | BillStep)[]) => void;
};

export const useTotalExpenseAmountStore = create<State & Action>(set => ({
  totalExpenseAmount: 0,
  updateTotalExpenseAmount: stepList => set({totalExpenseAmount: getTotalExpenseAmount(stepList)}),
}));
