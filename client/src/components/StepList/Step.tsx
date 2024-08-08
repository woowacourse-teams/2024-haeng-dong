import type {BillStep, MemberStep} from 'types/serviceType';

import {useState} from 'react';

import BillStepItem from './BillStepItem';
import MemberStepItem from './MemberStepItem';

interface StepProps {
  step: BillStep | MemberStep;
}

const Step = ({step}: StepProps) => {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<boolean>(false);

  if (step.type === 'BILL') {
    return (
      <BillStepItem step={step} isOpenBottomSheet={isOpenBottomSheet} setIsOpenBottomSheet={setIsOpenBottomSheet} />
    );
  } else if (step.type === 'IN' || step.type === 'OUT') {
    return (
      <MemberStepItem step={step} isOpenBottomSheet={isOpenBottomSheet} setIsOpenBottomSheet={setIsOpenBottomSheet} />
    );
  } else {
    return <></>;
  }
};

export default Step;
