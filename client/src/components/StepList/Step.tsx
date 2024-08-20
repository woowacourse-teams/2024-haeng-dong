import type {BillStep, MemberStep} from 'types/serviceType';

import {useState} from 'react';

import BillStepItem from './BillStepItem';
import MemberStepItem from './MemberStepItem';

interface StepProps {
  step: BillStep | MemberStep;
  isAddEditableItem: boolean;
  setIsAddEditableItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step = ({step, isAddEditableItem, setIsAddEditableItem}: StepProps) => {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<boolean>(false);

  if (isAddEditableItem || (step.actions && step.type === 'BILL')) {
    return (
      <BillStepItem
        step={step as BillStep}
        isOpenBottomSheet={isOpenBottomSheet}
        setIsOpenBottomSheet={setIsOpenBottomSheet}
        isAddEditableItem={isAddEditableItem}
        setIsAddEditableItem={setIsAddEditableItem}
      />
    );
  } else if (step.actions && (step.type === 'IN' || step.type === 'OUT')) {
    return (
      <MemberStepItem step={step} isOpenBottomSheet={isOpenBottomSheet} setIsOpenBottomSheet={setIsOpenBottomSheet} />
    );
  } else {
    return <></>;
  }
};

export default Step;
