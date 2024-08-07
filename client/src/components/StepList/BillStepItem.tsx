import type {BillStep} from 'types/serviceType';

import {DragHandleItem, DragHandleItemContainer} from 'haengdong-design';

interface BillStepItemProps {
  step: BillStep;
  isOpenBottomSheet: boolean;
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillStepItem: React.FC<BillStepItemProps> = ({step, isOpenBottomSheet, setOpenBottomSheet}) => {
  const totalPrice = step.actions.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <DragHandleItemContainer
      topLeftText={step.stepName}
      topRightText={`${step.members.length}명`}
      bottomLeftText="총액"
      bottomRightText={`${totalPrice.toLocaleString('ko-kr')} 원`}
      backgroundColor="white"
    >
      {step.actions.map(action => (
        <DragHandleItem
          hasDragHandler={true}
          prefix={action.name}
          suffix={`${action.price.toLocaleString('ko-kr')} 원`}
          backgroundColor="lightGrayContainer"
        />
      ))}
    </DragHandleItemContainer>
  );
};

export default BillStepItem;
