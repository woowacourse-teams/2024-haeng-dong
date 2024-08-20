import type {BillStep, MemberStep} from 'types/serviceType';

import {useEffect, useState} from 'react';

import BillStepItem from './BillStepItem';
import MemberStepItem from './MemberStepItem';

interface StepProps {
  step: BillStep | MemberStep;
  isAddEditableItem: boolean;
  lastBillItemIndex: number;
  setIsAddEditableItem: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

const Step = ({step, isAddEditableItem, lastBillItemIndex, setIsAddEditableItem, index}: StepProps) => {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<boolean>(false);
  const [isLastBillItem, setIsLastBillItem] = useState<boolean>(false);

  useEffect(() => {
    if (index === lastBillItemIndex) {
      // index를 사용하여 마지막 BillStep인지 확인
      setIsLastBillItem(true);
    }
  }, [index, lastBillItemIndex]);

  if (step.actions && step.type === 'BILL') {
    return (
      <BillStepItem
        index={index}
        step={step as BillStep}
        isOpenBottomSheet={isOpenBottomSheet}
        setIsOpenBottomSheet={setIsOpenBottomSheet}
        isAddEditableItem={isAddEditableItem}
        setIsAddEditableItem={setIsAddEditableItem}
        isLastBillItem={isLastBillItem}
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
