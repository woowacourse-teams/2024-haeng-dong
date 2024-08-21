import {Flex} from 'haengdong-design';

import {BillStep, MemberStep} from 'types/serviceType';
import useRequestGetStepList from '@hooks/queries/useRequestGetStepList';

import Step from './Step';

const StepList = () => {
  const {data: stepListData} = useRequestGetStepList();
  const stepList = stepListData ?? ([] as (MemberStep | BillStep)[]);

  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {stepList.map((step, index) => (
        <Step step={step} key={`${step.stepName}${index}`} />
      ))}
    </Flex>
  );
};

export default StepList;
