import type {BillStep} from 'types/serviceType';

import {StepItem} from 'haengdong-design';

interface BillStepItemProps {
  step: BillStep;
  isOpenBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillStepItem: React.FC<BillStepItemProps> = ({step, isOpenBottomSheet, setOpenBottomSheet}) => {
  return (
    <StepItem
      name={step.stepName === null ? '행사' : step.stepName}
      bills={step.actions}
      personCount={step.members.length}
    />
  );
};

export default BillStepItem;
