import type {BillAction} from 'types/serviceType';

import {BottomSheet, FixedButton, LabelGroupInput, Text} from 'haengdong-design';

import validatePurchase from '@utils/validate/validatePurchase';

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
  const {inputPair, handleInputChange, handleOnBlur, errorMessage, errorInfo, canSubmit, onSubmit, onDelete} =
    usePutAndDeleteBillAction(
      {title: billAction.name, price: String(billAction.price), index: 0},
      validatePurchase,
      () => setIsBottomSheetOpened(false),
    );

  return (
    <BottomSheet isOpened={isBottomSheetOpened} onClose={() => setIsBottomSheetOpened(false)}>
      <form css={bottomSheetStyle} onSubmit={event => onSubmit(event, inputPair, billAction.actionId)}>
        <h2 css={bottomSheetHeaderStyle}>
          <Text size="bodyBold">지출 내역 수정하기</Text>
        </h2>
        <fieldset css={inputContainerStyle}>
          <LabelGroupInput labelText="지출내역 / 금액" errorText={errorMessage}>
            <LabelGroupInput.Element
              aria-label="지출 내역"
              elementKey={'title'}
              type="text"
              value={inputPair.title}
              onChange={event => handleInputChange('title', event)}
              onBlur={handleOnBlur}
              isError={errorInfo.title}
              placeholder="지출 내역"
            />
            <LabelGroupInput.Element
              aria-label="금액"
              elementKey={'price'}
              type="number"
              value={inputPair.price}
              onChange={event => handleInputChange('price', event)}
              onBlur={handleOnBlur}
              isError={errorInfo.price}
              placeholder="금액"
            />
          </LabelGroupInput>
        </fieldset>
        <FixedButton
          type="submit"
          variants="primary"
          disabled={!canSubmit}
          onDeleteClick={() => onDelete(billAction.actionId)}
        >
          수정 완료
        </FixedButton>
      </form>
    </BottomSheet>
  );
};

export default PutAndDeleteBillActionModal;
