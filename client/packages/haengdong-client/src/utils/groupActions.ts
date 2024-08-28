import {BillStep, ConvertedAction, MemberStep} from 'types/serviceType';

import stepListToAction from './stepListToActions';

const groupActions = (stepList: (BillStep | MemberStep)[]) => {
  const actions = stepListToAction(stepList);
  const groupedActions: ConvertedAction[][] = [];

  let group: ConvertedAction[] = [];

  actions.forEach((action, index) => {
    if (group.length === 0 || group[group.length - 1].type === action.type) {
      group.push(action);
    } else {
      groupedActions.push(group);
      group = [];
    }

    if (index === actions.length - 1) {
      groupedActions.push(group);
    }
  });

  return groupedActions;
};

export default groupActions;
