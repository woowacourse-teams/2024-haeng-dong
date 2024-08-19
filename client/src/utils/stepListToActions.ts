import {BillStep, ConvertedAction, MemberStep} from 'types/serviceType';

const stepListToAction = (stepList: (BillStep | MemberStep)[]) => {
  // (@todari) test용이라 임시로 any 사용할게용...
  // Action을 사용하려고 하는데 serviceType의 기존 Action이랑 겹쳐서요~~~
  const actions: ConvertedAction[] = [];

  stepList.forEach(step => {
    step.actions.forEach(action => {
      actions.push({
        actionId: action.actionId,
        name: action.name,
        price: action.price ? action.price.toLocaleString() : null,
        sequence: action.sequence,
        type: step.type,
      });
    });
  });

  return actions;
};

export default stepListToAction;
