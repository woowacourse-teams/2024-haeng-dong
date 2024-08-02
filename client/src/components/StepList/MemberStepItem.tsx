import type {MemberStep} from 'types/serviceType';

import {InOutItem} from 'haengdong-design';

import ComeInMember from '@components/Modal/InOut/ComeInMember';
import GetOutMember from '@components/Modal/InOut/GetOutMember';

interface MemberStepItemProps {
  step: MemberStep;
  isOpenBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const MemberStepItem: React.FC<MemberStepItemProps> = ({step, isOpenBottomSheet, setOpenBottomSheet}) => {
  return (
    <>
      <InOutItem
        inOutType={step.type}
        names={step.actions.map(({name}) => name)}
        onClick={() => setOpenBottomSheet(prev => !prev)}
      />
      {isOpenBottomSheet && step.type === 'IN' && (
        <ComeInMember
          actions={step.actions}
          openBottomSheet={isOpenBottomSheet}
          setOpenBottomSheet={() => setOpenBottomSheet(prev => !prev)}
        />
      )}
      {isOpenBottomSheet && step.type === 'OUT' && (
        <GetOutMember
          openBottomSheet={isOpenBottomSheet}
          setOpenBottomSheet={() => setOpenBottomSheet(prev => !prev)}
        />
      )}
    </>
  );
};

export default MemberStepItem;
