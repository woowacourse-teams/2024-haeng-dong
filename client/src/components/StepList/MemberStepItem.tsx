import type {MemberStep} from 'types/serviceType';

import {useOutletContext} from 'react-router-dom';

import {DragHandleItem} from '@HDesign/index';
import {DeleteMemberActionModal} from '@components/Modal/SetActionModal/DeleteMemberActionModal';
import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

interface MemberStepItemProps {
  step: MemberStep;
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const MemberStepItem: React.FC<MemberStepItemProps> = ({step, isOpenBottomSheet, setIsOpenBottomSheet}) => {
  const {isAdmin} = useOutletContext<EventPageContextProps>();

  return (
    <>
      <DragHandleItem
        hasDragHandler={false}
        backgroundColor="white"
        prefix={`${step.actions.map(({name}) => name).join(', ')} ${step.type === 'IN' ? '들어옴' : '나감'}`}
        onClick={() => setIsOpenBottomSheet(prev => !prev)}
      />
      {isOpenBottomSheet && isAdmin && (
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
