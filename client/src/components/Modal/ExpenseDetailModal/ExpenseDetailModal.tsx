import type {BillAction} from 'types/serviceType';

import {BottomSheet, EditableItem, FixedButton, Flex, Text} from '@HDesign/index';

import validatePurchase from '@utils/validate/validatePurchase';
import useRequestGetStepList from '@hooks/queries/useRequestGetStepList';
import useMemberReportListInAction from '@hooks/useMemberReportListInAction/useMemberReportListInAction';
import useMemberReportInput from '@hooks/useMemberReportListInAction/useMemberReportInput';

import usePutAndDeleteBillAction from '@hooks/usePutAndDeleteBillAction';

import {
  bottomSheetHeaderStyle,
  bottomSheetStyle,
  inputContainerStyle,
} from '../SetActionModal/PutAndDeleteBillActionModal/PutAndDeltetBillActionModal.style';

type PutAndDeleteBillActionModalProps = {
  billAction: BillAction;
  isBottomSheetOpened: boolean;
  setIsBottomSheetOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpenseDetailModal = ({
  billAction,
  isBottomSheetOpened,
  setIsBottomSheetOpened,
}: PutAndDeleteBillActionModalProps) => {
  const {
    inputPair,
    handleInputChange,
    // handleOnBlur,
    // errorMessage,
    // errorInfo,
    canSubmit,
    onDelete,
    onSubmit: putBillAction,
  } = usePutAndDeleteBillAction(
    {title: billAction.name, price: String(billAction.price), index: 0},
    validatePurchase,
    () => setIsBottomSheetOpened(false),
  );

  const {
    memberReportListInAction,
    addAdjustedMember,
    onSubmit: putMemberReportListInAction,
    getIsSamePriceStateAndServerState,
    getOnlyOneNotAdjustedRemainMemberIndex,
    isExistAdjustedPrice,
  } = useMemberReportListInAction(billAction.actionId, Number(inputPair.price), () => setIsBottomSheetOpened(false));
  const {
    inputList,
    onChange,
    canEditList,
    canSubmit: isChangedMemberReportInput,
  } = useMemberReportInput({
    data: memberReportListInAction,
    addAdjustedMember,
    totalPrice: Number(inputPair.price),
    getIsSamePriceStateAndServerState,
    getOnlyOneNotAdjustedRemainMemberIndex,
  });

  const {data: stepListData = []} = useRequestGetStepList();

  const actionMemberList = stepListData.filter(({actions}) =>
    actions.find(({actionId}) => actionId === billAction.actionId),
  )[0].members;

  return (
    <BottomSheet isOpened={isBottomSheetOpened} onClose={() => setIsBottomSheetOpened(false)}>
      <form css={bottomSheetStyle} onSubmit={() => setIsBottomSheetOpened(false)}>
        <h2 css={bottomSheetHeaderStyle}>
          <Text size="bodyBold">지출 내역 상세</Text>
        </h2>
        <fieldset css={inputContainerStyle}>
          <EditableItem backgroundColor="lightGrayContainer" prefixLabelText="지출 내역 / 금액">
            <EditableItem.Input
              placeholder="지출 내역"
              textSize="bodyBold"
              value={inputPair.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', event)}
              disabled
            />
            <Flex alignItems="center" gap="0.25rem">
              <EditableItem.Input
                placeholder="0"
                style={{
                  textAlign: 'right',
                }}
                type="number"
                value={inputPair.price}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange('price', event)}
                isFixed={isExistAdjustedPrice()}
                disabled
              />
              <Text size="caption">원</Text>
            </Flex>
          </EditableItem>

          <EditableItem
            backgroundColor="lightGrayContainer"
            prefixLabelText="참여자"
            suffixLabelText={`총 ${actionMemberList.length}명`}
          >
            <Flex flexDirection="column" width="100%" gap="1rem">
              {inputList.map(({name, price, isFixed}, index) => (
                <Flex key={name} justifyContent="spaceBetween">
                  <EditableItem.Input
                    value={name}
                    placeholder="참여자 명"
                    textSize="smallBodyBold"
                    disabled
                  ></EditableItem.Input>
                  <Flex gap="0.25rem" alignItems="center">
                    <EditableItem.Input
                      onChange={event => onChange(event, index)}
                      isFixed={isFixed}
                      textSize="smallBody"
                      value={price}
                      placeholder="0"
                      type="number"
                      disabled
                      style={{textAlign: 'right'}}
                    ></EditableItem.Input>
                    <Text size="caption">원</Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </EditableItem>
        </fieldset>
        <FixedButton type="submit" variants="tertiary">
          닫기
        </FixedButton>
      </form>
    </BottomSheet>
  );
};

export default ExpenseDetailModal;
