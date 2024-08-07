import type {BillStep, MemberStep} from 'types/serviceType';

import {useState} from 'react';

import BillStepItem from './BillStepItem';
import MemberStepItem from './MemberStepItem';

interface StepProps {
  step: BillStep | MemberStep;
}

const Step = ({step}: StepProps) => {
  const [isOpenBottomSheet, setOpenBottomSheet] = useState<boolean>(false);

  if (step.type === 'BILL') {
    return <BillStepItem step={step} isOpenBottomSheet={isOpenBottomSheet} setOpenBottomSheet={setOpenBottomSheet} />;
  } else if (step.type === 'IN' || step.type === 'OUT') {
    return <MemberStepItem step={step} isOpenBottomSheet={isOpenBottomSheet} setOpenBottomSheet={setOpenBottomSheet} />;
  } else {
    return <></>;
  }
};

export default Step;
