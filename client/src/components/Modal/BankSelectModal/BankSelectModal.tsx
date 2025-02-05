import {useEffect, useRef} from 'react';

import {BankName} from 'types/serviceType';
import {IconX} from '@components/Design/components/Icons/Icons/IconX';

import {BankSelect, BottomSheet, Text} from '@HDesign/index';

import {bottomSheetHeaderStyle, bottomSheetStyle, inputContainerStyle} from './BankSelectModal.style';

type BankSelectProps = {
  isBottomSheetOpened: boolean;
  onClose: () => void;
  selectBank: (name: BankName) => void;
};

const BankSelectModal = ({isBottomSheetOpened, onClose, selectBank}: BankSelectProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const selectBankAndClose = (name: BankName) => {
    selectBank(name);
    onClose();
  };

  useEffect(() => {
    if (!isBottomSheetOpened) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusable = focusableElements?.[0] as HTMLElement;
    const lastFocusable = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    const handleFocusChange = () => {
      const isModalElement = Array.from(focusableElements ?? []).some(element => element === document.activeElement);

      if (!isModalElement) {
        (focusableElements?.[1] as HTMLElement)?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('focusin', handleFocusChange);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('focusin', handleFocusChange);
    };
  }, [isBottomSheetOpened]);

  return (
    <BottomSheet isOpened={isBottomSheetOpened} onClose={onClose}>
      <div css={bottomSheetStyle} ref={modalRef}>
        <h2 css={bottomSheetHeaderStyle}>
          <Text size="bodyBold">은행을 선택해주세요</Text>
          <button onClick={onClose} aria-label="바텀시트 닫기">
            <IconX size={24} aria-hidden="true" />
          </button>
        </h2>
        <fieldset css={inputContainerStyle}>
          <BankSelect onSelect={selectBankAndClose} />
        </fieldset>
      </div>
    </BottomSheet>
  );
};

export default BankSelectModal;
