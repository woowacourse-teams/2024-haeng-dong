import {BankName} from 'types/serviceType';

import {BankSelect, BottomSheet, Text} from '@HDesign/index';

import {bottomSheetHeaderStyle, bottomSheetStyle, inputContainerStyle} from './BankSelectModal.style';

type BankSelectProps = {
  isBottomSheetOpened: boolean;
  setIsBottomSheetOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectBank: (name: BankName) => void;
};

const BankSelectModal = ({isBottomSheetOpened, setIsBottomSheetOpened, selectBank}: BankSelectProps) => {
  const selectBankAndClose = (name: BankName) => {
    selectBank(name);
    setIsBottomSheetOpened(false);
  };

  return (
    <BottomSheet isOpened={isBottomSheetOpened} onClose={() => setIsBottomSheetOpened(false)}>
      <div css={bottomSheetStyle}>
        <h2 css={bottomSheetHeaderStyle}>
          <Text size="bodyBold">은행을 선택해주세요</Text>
        </h2>
        <fieldset css={inputContainerStyle}>
          <BankSelect onSelect={selectBankAndClose} />
        </fieldset>
      </div>
    </BottomSheet>
  );
};

export default BankSelectModal;
