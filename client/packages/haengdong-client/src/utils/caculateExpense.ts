import {BillAction, BillStep, MemberStep} from 'types/serviceType';

export const calculateStepExpense = (actions: BillAction[]) => {
  return actions.reduce((sum, {price}) => sum + price, 0);
};

export const getTotalExpenseAmount = (stepList: (MemberStep | BillStep)[]) => {
  return stepList.reduce((sum, {type, actions}) => {
    if (type === 'BILL') {
      return sum + calculateStepExpense(actions);
    }
    return sum;
  }, 0);
};
