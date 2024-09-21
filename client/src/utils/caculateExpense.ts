import {Step} from 'types/serviceType';

export const getTotalExpenseAmount = (steps: Step[]) => {
  return steps.reduce((total, step) => {
    const stepTotal = step.bills.reduce((sum, bill) => sum + bill.price, 0);
    return total + stepTotal;
  }, 0);
};
