import type {BillStep} from 'types/serviceType';

import {DragHandleItem, DragHandleItemContainer} from 'haengdong-design';
import {Fragment, useState} from 'react';

import {PutAndDeleteBillActionModal} from '@components/Modal/SetActionModal/PutAndDeleteBillActionModal';

interface BillStepItemProps {
  step: BillStep;
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillStepItem: React.FC<BillStepItemProps> = ({step, isOpenBottomSheet, setOpenBottomSheet}) => {
  const [clickedIndex, setClickedIndex] = useState(-1);

  const totalPrice = step.actions.reduce((acc, cur) => acc + cur.price, 0);

  const handleDragHandleItemClick = (index: number) => {
    setClickedIndex(index);
    setOpenBottomSheet(true);
  };

  return (
    <DragHandleItemContainer
      topLeftText={step.stepName}
      topRightText={`${step.members.length}명`}
      bottomLeftText="총액"
      bottomRightText={`${totalPrice.toLocaleString('ko-kr')} 원`}
      backgroundColor="white"
    >
      {step.actions.map((action, index) => (
        <Fragment key={action.actionId}>
          <DragHandleItem
            hasDragHandler={true}
            prefix={action.name}
            suffix={`${action.price.toLocaleString('ko-kr')} 원`}
            backgroundColor="lightGrayContainer"
            onClick={() => handleDragHandleItemClick(index)}
          />
          {isOpenBottomSheet && clickedIndex === index && (
            <PutAndDeleteBillActionModal
              billAction={action}
              isBottomSheetOpened={isOpenBottomSheet}
              setIsBottomSheetOpened={setOpenBottomSheet}
            />
          )}
        </Fragment>
      ))}
    </DragHandleItemContainer>
  );
};

export default BillStepItem;
