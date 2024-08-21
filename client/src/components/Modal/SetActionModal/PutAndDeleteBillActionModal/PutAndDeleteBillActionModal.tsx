import type {BillAction} from 'types/serviceType';

import {BottomSheet, EditableItem, FixedButton, Flex, Text} from 'haengdong-design';

import validatePurchase from '@utils/validate/validatePurchase';
import useRequestGetStepList from '@hooks/queries/useRequestGetStepList';
import useMemberReportListInAction from '@hooks/useMemberReportListInAction/useMemberReportListInAction';
import useMemberReportInput from '@hooks/useMemberReportListInAction/useMemberReportInput';
import {useToast} from '@hooks/useToast/useToast';

import usePutAndDeleteBillAction from '@hooks/usePutAndDeleteBillAction';

import {bottomSheetHeaderStyle, bottomSheetStyle, inputContainerStyle} from './PutAndDeltetBillActionModal.style';

type PutAndDeleteBillActionModalProps = {
  billAction: BillAction;
  isBottomSheetOpened: boolean;
  setIsBottomSheetOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const PutAndDeleteBillActionModal = ({
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
  } = useMemberReportListInAction(billAction.actionId, Number(inputPair.price));
  const {
    inputList,
    onChange,
    canEditList,
    canSubmit: isChangedMemberReportInput,
  } = useMemberReportInput({
    data: memberReportListInAction,
    addAdjustedMember,
    totalPrice: billAction.price,
    getIsSamePriceStateAndServerState,
    getOnlyOneNotAdjustedRemainMemberIndex,
  });

  const {data: stepListData = []} = useRequestGetStepList();

  const actionMemberList = stepListData.filter(({actions}) =>
    actions.find(({actionId}) => actionId === billAction.actionId),
  )[0].members;

  const {showToast} = useToast();

  return (
    <BottomSheet isOpened={isBottomSheetOpened} onClose={() => setIsBottomSheetOpened(false)}>
      <form
        css={bottomSheetStyle}
        // TODO: (@weadie) 페이탈 오류라 그냥 하드코딩했습니다.
        onSubmit={async event => {
          event.preventDefault();
          try {
            const onSuccessCallBack = isChangedMemberReportInput ? putMemberReportListInAction : () => {};
            if (canSubmit) {
              putBillAction(event, inputPair, billAction.actionId, onSuccessCallBack);
            }
          } catch (error) {
            showToast({
              isClickToClose: true,
              showingTime: 3000,
              message: '요청에 실패했습니다.',
              type: 'error',
              position: 'top',
              top: '30px',
              style: {
                zIndex: 9000,
              },
            });
          }
        }}
      >
        <h2 css={bottomSheetHeaderStyle}>
          <Text size="bodyBold">지출 내역 수정하기</Text>
        </h2>
        <fieldset css={inputContainerStyle}>
          <EditableItem backgroundColor="lightGrayContainer" prefixLabelText="지출 내역 / 금액">
            <EditableItem.Input
              placeholder="지출 내역"
              textSize="bodyBold"
              value={inputPair.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', event)}
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
                      readOnly={!canEditList[index]}
                      style={{textAlign: 'right'}}
                    ></EditableItem.Input>
                    <Text size="caption">원</Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </EditableItem>
        </fieldset>
        <FixedButton
          type="submit"
          variants="primary"
          disabled={!(canSubmit || isChangedMemberReportInput)}
          onDeleteClick={() => onDelete(billAction.actionId)}
        >
          수정 완료
        </FixedButton>
      </form>
    </BottomSheet>
  );
};

export default PutAndDeleteBillActionModal;
