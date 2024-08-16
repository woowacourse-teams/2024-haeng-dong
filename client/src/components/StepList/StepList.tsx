import {Flex} from 'haengdong-design';

import {useStepList} from '@hooks/useStepList/useStepList';

import Step from './Step';

const StepList = () => {
  const {stepList} = useStepList();

  // TODO: (@weadie) if else 구문이 지저분하므로 리펙터링이 필요합니다.
  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {stepList.map((step, index) => (
        <Step step={step} key={`${step.stepName}${index}`} />
      ))}
    </Flex>
  );
};

export default StepList;
