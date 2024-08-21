import type {BillStep, MemberStep} from 'types/serviceType';

import {useEffect, useState} from 'react';

import BillStepItem from './BillStepItem';
import MemberStepItem from './MemberStepItem';

interface StepProps {
  step: BillStep | MemberStep;
  isAddEditableItem: boolean;
  lastBillItemIndex: number;
  lastItemIndex: number;
  index: number;
  setIsAddEditableItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step = ({step, isAddEditableItem, lastBillItemIndex, lastItemIndex, setIsAddEditableItem, index}: StepProps) => {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<boolean>(false);
  const [isLastBillItem, setIsLastBillItem] = useState<boolean>(false);

  useEffect(() => {
    if (index === lastBillItemIndex && lastBillItemIndex === lastItemIndex) {
      // index를 사용하여 마지막 BillStep인지 확인
      setIsLastBillItem(true);
    } else {
      setIsLastBillItem(false);
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
