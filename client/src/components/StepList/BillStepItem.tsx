import type {BillStep, MemberReport} from 'types/serviceType';

import {DragHandleItem, DragHandleItemContainer} from 'haengdong-design';
import {Fragment, useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import {PutAndDeleteBillActionModal} from '@components/Modal/SetActionModal/PutAndDeleteBillActionModal';
import {MemberListInBillStep} from '@components/Modal/MemberListInBillStep';
import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

interface BillStepItemProps {
  step: BillStep;
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillStepItem: React.FC<BillStepItemProps> = ({step, isOpenBottomSheet, setIsOpenBottomSheet}) => {
  const {isAdmin} = useOutletContext<EventPageContextProps>();
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isOpenMemberListInBillStep, setIsOpenMemberListInBillStep] = useState(false);

  const stepName = `차`;
  const totalPrice = step.actions.reduce((acc, cur) => acc + cur.price, 0);

  const handleDragHandleItemClick = (index: number) => {
    setClickedIndex(index);
    setIsOpenBottomSheet(true);
  };

  const memberList: MemberReport[] = step.members.map(member => ({
    name: member,
    price: totalPrice / step.members.length,
  }));

  const handleTopRightTextClick = () => {
    setIsOpenMemberListInBillStep(true);
  };

  return (
    <>
      <DragHandleItemContainer
        topLeftText={stepName}
        topRightText={`${step.members.length}명`}
        bottomLeftText="총액"
        bottomRightText={`${totalPrice.toLocaleString('ko-kr')} 원`}
        backgroundColor="white"
        onTopRightTextClick={handleTopRightTextClick}
      >
        {step.actions.map((action, index) => (
          <Fragment key={action.actionId}>
            <DragHandleItem
              hasDragHandler={isAdmin}
              prefix={action.name}
              suffix={`${action.price.toLocaleString('ko-kr')} 원`}
              backgroundColor="lightGrayContainer"
              onClick={() => handleDragHandleItemClick(index)}
            />
            {isOpenBottomSheet && clickedIndex === index && isAdmin && (
              <PutAndDeleteBillActionModal
                billAction={action}
                isBottomSheetOpened={isOpenBottomSheet}
                setIsBottomSheetOpened={setIsOpenBottomSheet}
              />
            )}
          </Fragment>
        ))}
      </DragHandleItemContainer>
      {isOpenMemberListInBillStep && (
        <MemberListInBillStep
          stepName={stepName}
          memberList={memberList}
          isOpenBottomSheet={isOpenMemberListInBillStep}
          setIsOpenBottomSheet={setIsOpenMemberListInBillStep}
        />
      )}
    </>
  );
};

export default BillStepItem;
