import {Flex, StepItem, InOutItem} from 'haengdong-design';
import {useStepList} from '@hooks/useStepList/useStepList';
import {useState} from 'react';
import ComeInMember from '@components/Modal/MangchoModal/ComeInMember';

const StepList = () => {
  const {stepList} = useStepList();
  const [isModalOn, setIsModalOn] = useState<boolean>(false);

  // TODO: (@weadie) if else 구문이 지저분하므로 리펙터링이 필요합니다.
  return (
    <Flex flexDirection="column" gap="0.5rem" paddingInline="0.5rem">
      {stepList.map(step => {
        if (step.type === 'BILL') {
          return (
            <StepItem
              name={step.stepName === null ? '행사' : step.stepName}
              bills={step.actions}
              personCount={step.members.length}
            />
          );
        } else if (step.type === 'IN' || step.type === 'OUT') {
          return (
            <InOutItem
              inOutType={step.type}
              names={step.actions.map(({name}) => name)}
              onClick={() => setIsModalOn(prev => !prev)}
            />
          );
        } else {
          return <></>;
        }
      })}
      {isModalOn && <ComeInMember isOpened={isModalOn} setOpenBottomSheet={() => setIsModalOn(prev => !prev)} />}
    </Flex>
  );
};

export default StepList;
