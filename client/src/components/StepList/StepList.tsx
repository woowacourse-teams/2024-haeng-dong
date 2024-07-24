import {useStepList} from '@hooks/useStepList/useStepList';
import {Flex, InOutItem, StepItem} from 'haengdong-design';
import {MemberType} from 'types/stepList';

const StepList = () => {
  const {stepList} = useStepList();

  // TODO: (@weadie) if else 구문이 지저분하므로 리펙터링이 필요합니다.
  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem" padding="1rem 0 0 0">
      {stepList.map(step => {
        if (step.type === 'BILL') {
          return <StepItem name={step.stepName} bills={step.actions} personCount={0} />;
        } else if (step.type === 'IN' || step.type === 'OUT') {
          return <InOutItem inOutType={step.type} names={step.actions.map(({name}) => name)} />;
        } else {
          return <></>;
        }
      })}
    </Flex>
  );
};

export default StepList;
