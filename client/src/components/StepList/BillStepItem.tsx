import {DragHandleItem, DragHandleItemContainer, EditableItem, Flex, Text} from 'haengdong-design';
import {Fragment, useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import {BillStep, MemberReport} from 'types/serviceType';
import {PutAndDeleteBillActionModal} from '@components/Modal/SetActionModal/PutAndDeleteBillActionModal';
import {MemberListInBillStep} from '@components/Modal/MemberListInBillStep';
import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import useSetBillInput from '@hooks/useSetBillInput';

interface BillStepItemProps {
  step: BillStep;
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  isAddEditableItem: boolean;
  setIsAddEditableItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillStepItem: React.FC<BillStepItemProps> = ({
  step,
  isOpenBottomSheet,
  setIsOpenBottomSheet,
  isAddEditableItem,
  setIsAddEditableItem,
}) => {
  const {isAdmin} = useOutletContext<EventPageContextProps>();
  const {handleBlurBillRequest, handleChangeBillInput} = useSetBillInput();

  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isOpenMemberListInBillStep, setIsOpenMemberListInBillStep] = useState(false);

  const stepName = `차`;
  const totalPrice = step.actions && step.type === 'BILL' ? step.actions.reduce((acc, cur) => acc + cur.price, 0) : 0;

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
        {step.actions &&
          step.type === 'BILL' &&
          step.actions.map((action, index) => (
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

        {isAddEditableItem && (
          <EditableItem backgroundColor="lightGrayContainer" onBlur={handleBlurBillRequest}>
            <EditableItem.Input
              placeholder="지출 내역"
              textSize="bodyBold"
              onChange={e => handleChangeBillInput('title', e)}
            ></EditableItem.Input>
            <Flex gap="0.25rem" alignItems="center">
              <EditableItem.Input
                placeholder="0"
                type="number"
                onChange={e => {
                  handleChangeBillInput('price', e);
                  setIsAddEditableItem(false);
                }}
                style={{textAlign: 'right'}}
              ></EditableItem.Input>
              <Text size="caption">원</Text>
            </Flex>
          </EditableItem>
        )}
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
