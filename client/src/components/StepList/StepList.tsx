import {Flex} from 'haengdong-design';

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

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {stepList.map((step, index) => (
        <Step
          step={step}
          key={`${step.stepName}${index}`}
          isAddEditableItem={isAddEditableItem}
          setIsAddEditableItem={setIsAddEditableItem}
        />
      ))}
    </Flex>
  );
};

export default StepList;
