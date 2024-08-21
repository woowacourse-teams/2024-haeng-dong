import {Flex} from 'haengdong-design';
import {useEffect, useMemo, useState} from 'react';

import {BillStep, MemberStep} from 'types/serviceType';
import useRequestGetStepList from '@hooks/queries/useRequestGetStepList';

import Step from './Step';

interface StepListProps {
  isAddEditableItem?: boolean;
  setIsAddEditableItem?: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepList = ({isAddEditableItem = false, setIsAddEditableItem = () => {}}: StepListProps) => {
  const {data: stepListData} = useRequestGetStepList();
  const [stepList, setStepList] = useState<(MemberStep | BillStep)[]>([]);
  const existIndexInStepList = stepList.map((step, index) => ({...step, index}));
  const [hasAddedItem, setHasAddedItem] = useState(false);

  useEffect(() => {
    if (stepListData) {
      setStepList(stepListData);
    }
  }, [stepListData]);

  const lastBillItemIndex = useMemo(() => {
    const billSteps = existIndexInStepList.filter(step => step.type === 'BILL');

    // billSteps 배열이 비어 있지 않으면 마지막 항목의 index를 반환, 그렇지 않으면 -1을 반환
    return billSteps.length > 0 ? billSteps.slice(-1)[0].index : -1;
  }, [stepList]);

  const lastItemIndex = useMemo(() => {
    return existIndexInStepList.length > 0 ? existIndexInStepList.slice(-1)[0].index : -1;
  }, [existIndexInStepList]);

  useEffect(() => {
    // 최초로 빈 stepList가 생성되고 난 후, 다시 hasAddedItem을 false로 변환하기 위한 조건문
    if (hasAddedItem) setHasAddedItem(prev => !prev);

    if (isAddEditableItem && lastBillItemIndex !== lastItemIndex && !hasAddedItem) {
      setStepList(prev => [
        ...prev,
        {
          type: 'BILL',
          stepName: '',
          members: [],
          actions: [],
        },
      ]);
      setHasAddedItem(prev => !prev);
    }
  }, [isAddEditableItem, lastBillItemIndex, lastItemIndex, hasAddedItem, existIndexInStepList, stepListData]);

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {stepList.map((step, index) => (
        <Step
          index={index}
          step={step}
          lastBillItemIndex={lastBillItemIndex}
          lastItemIndex={lastItemIndex}
          key={`${step.stepName}${index}`}
          isAddEditableItem={isAddEditableItem}
          setIsAddEditableItem={setIsAddEditableItem}
        />
      ))}
    </Flex>
  );
};

export default StepList;
