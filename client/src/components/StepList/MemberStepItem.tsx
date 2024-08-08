import type {MemberStep} from 'types/serviceType';

import {DragHandleItem} from 'haengdong-design';

import {DeleteMemberActionModal} from '@components/Modal/SetActionModal/DeleteMemberActionModal';

interface MemberStepItemProps {
  step: MemberStep;
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const MemberStepItem: React.FC<MemberStepItemProps> = ({step, isOpenBottomSheet, setIsOpenBottomSheet}) => {
  return (
    <>
      <DragHandleItem
        backgroundColor="white"
        prefix={`${step.actions.map(({name}) => name).join(', ')} ${step.type === 'IN' ? '들어옴' : '나감'}`}
        onClick={() => setIsOpenBottomSheet(prev => !prev)}
      />
      {isOpenBottomSheet && (
        <DeleteMemberActionModal
          memberActionType={step.type}
          memberActionList={step.actions}
          isBottomSheetOpened={isOpenBottomSheet}
          setIsBottomSheetOpened={setIsOpenBottomSheet}
        />
      )}
    </>
  );
};

export default MemberStepItem;
