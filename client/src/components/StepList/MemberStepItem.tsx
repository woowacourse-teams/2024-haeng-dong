import type {MemberStep} from 'types/serviceType';

import {InOutItem} from 'haengdong-design';

import {DeleteMemberActionModal} from '@components/Modal/SetActionModal/DeleteMemberActionModal';

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
      {isOpenBottomSheet && (
        <DeleteMemberActionModal
          memberActionType={step.type}
          memberActionList={step.actions}
          isBottomSheetOpened={isOpenBottomSheet}
          setIsBottomSheetOpened={setOpenBottomSheet}
        />
      )}
    </>
  );
};

export default MemberStepItem;
