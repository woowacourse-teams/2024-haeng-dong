import {Flex} from 'haengdong-design';
import {useMemo} from 'react';

import {BillStep, MemberStep} from 'types/serviceType';
import useRequestGetStepList from '@hooks/queries/useRequestGetStepList';

import Step from './Step';

interface StepListProps {
  isAddEditableItem: boolean;
  setIsAddEditableItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepList = ({isAddEditableItem, setIsAddEditableItem}: StepListProps) => {
  const {data: stepListData} = useRequestGetStepList();
  const stepList = stepListData ?? ([] as (MemberStep | BillStep)[]);

  const lastBillItemIndex = useMemo(() => {
    const billSteps = stepList.map((step, index) => ({...step, index})).filter(step => step.type === 'BILL');

    // billSteps 배열이 비어 있지 않으면 마지막 항목의 index를 반환, 그렇지 않으면 -1을 반환
    return billSteps.length > 0 ? billSteps.slice(-1)[0].index : -1;
  }, [stepList]);

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {stepList.map((step, index) => (
        <Step
          index={index}
          step={step}
          lastBillItemIndex={lastBillItemIndex}
          key={`${step.stepName}${index}`}
          isAddEditableItem={isAddEditableItem}
          setIsAddEditableItem={setIsAddEditableItem}
        />
      ))}
    </Flex>
  );
};

export default StepList;
