import {InOutItem, StepItem} from 'haengdong-design';
import {useState} from 'react';

import {BillStep, MemberStep} from '@hooks/useStepList/type';
import ComeInMember from '@components/Modal/MangchoModal/ComeInMember';
import GetOutMember from '@components/Modal/MangchoModal/GetOutMember';

interface StepProps {
  step: BillStep | MemberStep;
}

const Step = ({step}: StepProps) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);

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
      <>
        <InOutItem
          inOutType={step.type}
          names={step.actions.map(({name}) => name)}
          onClick={() => setIsModalOn(prev => !prev)}
        />
        {isModalOn && step.type === 'IN' && (
          <ComeInMember
            actions={step.actions}
            openBottomSheet={isModalOn}
            setOpenBottomSheet={() => setIsModalOn(prev => !prev)}
          />
        )}
        {isModalOn && step.type === 'OUT' && (
          <GetOutMember openBottomSheet={isModalOn} setOpenBottomSheet={() => setIsModalOn(prev => !prev)} />
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default Step;
