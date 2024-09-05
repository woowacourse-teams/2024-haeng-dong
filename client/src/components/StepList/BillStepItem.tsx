import {DragHandleItem, DragHandleItemContainer, EditableItem, Flex, Text} from '@HDesign/index';
import {Fragment, useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import {BillStep, MemberReport} from 'types/serviceType';
import {PutAndDeleteBillActionModal} from '@components/Modal/SetActionModal/PutAndDeleteBillActionModal';
import {MemberListInBillStep} from '@components/Modal/MemberListInBillStep';
import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';
import ExpenseDetailModal from '@components/Modal/ExpenseDetailModal/ExpenseDetailModal';

import useSetBillInput from '@hooks/useSetBillInput';

interface BillStepItemProps {
  step: BillStep;
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  isAddEditableItem: boolean;
  setIsAddEditableItem: React.Dispatch<React.SetStateAction<boolean>>;
  isLastBillItem: boolean;
  index: number;
}

const BillStepItem: React.FC<BillStepItemProps> = ({
  step,
  isOpenBottomSheet,
  setIsOpenBottomSheet,
  isAddEditableItem,
  setIsAddEditableItem,
  isLastBillItem,
  index,
}) => {
  const {isAdmin} = useOutletContext<EventPageContextProps>();
  const {handleBlurBillRequest, handleChangeBillInput, billInput} = useSetBillInput({setIsAddEditableItem});

  const [clickedIndex, setClickedIndex] = useState(-1);
  const [isOpenMemberListInBillStep, setIsOpenMemberListInBillStep] = useState(false);

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
        id={`${index}`}
        topLeftText={step.stepName}
        topRightText={`${step.members.length}명`}
        bottomLeftText="총액"
        bottomRightText={`${totalPrice.toLocaleString('ko-kr')} 원`}
        backgroundColor="white"
        // TODO: (@soha) 백엔드의 요청으로 인해 인원수 click시 BottomSheet가 띄워지지 않도록 주석처리
        // onTopRightTextClick={handleTopRightTextClick}
      >
        {step.actions &&
          step.type === 'BILL' &&
          step.actions.map((action, index) => (
            <Fragment key={action.actionId}>
              <DragHandleItem
                // TODO: (@todari) dnd 없으므로 false
                // hasDragHandler={isAdmin}
                hasDragHandler={false}
                prefix={action.name}
                suffix={`${action.price.toLocaleString('ko-kr')} 원`}
                backgroundColor="lightGrayContainer"
                onClick={() => handleDragHandleItemClick(index)}
                isFixed={action.isFixed}
              />

              {isOpenBottomSheet && clickedIndex === index && isAdmin && (
                <PutAndDeleteBillActionModal
                  billAction={action}
                  isBottomSheetOpened={isOpenBottomSheet}
                  setIsBottomSheetOpened={setIsOpenBottomSheet}
                />
              )}
              {isOpenBottomSheet && clickedIndex === index && !isAdmin && (
                <ExpenseDetailModal
                  billAction={action}
                  isBottomSheetOpened={isOpenBottomSheet}
                  setIsBottomSheetOpened={setIsOpenBottomSheet}
                />
              )}
            </Fragment>
          ))}

        {isAddEditableItem && isLastBillItem && (
          <EditableItem
            backgroundColor="lightGrayContainer"
            onBlur={handleBlurBillRequest}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleBlurBillRequest();
              }
            }}
          >
            <EditableItem.Input
              placeholder="지출 내역"
              textSize="bodyBold"
              value={billInput.title}
              onChange={e => handleChangeBillInput('title', e)}
              autoFocus
            ></EditableItem.Input>
            <Flex gap="0.25rem" alignItems="center">
              <EditableItem.Input
                placeholder="0"
                type="number"
                value={billInput.price || ''}
                onChange={e => handleChangeBillInput('price', e)}
                style={{textAlign: 'right'}}
              ></EditableItem.Input>
              <Text size="caption">원</Text>
            </Flex>
          </EditableItem>
        )}
      </DragHandleItemContainer>
      <MemberListInBillStep
        stepName={step.stepName}
        memberList={memberList}
        isOpenBottomSheet={isOpenMemberListInBillStep}
        setIsOpenBottomSheet={setIsOpenMemberListInBillStep}
      />
    </>
  );
};

export default BillStepItem;
