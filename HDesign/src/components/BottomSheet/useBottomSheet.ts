import {useCallback, useEffect, useState} from 'react';

interface UseBottomSheetProps {
  isOpened: boolean;
  onChangeClose?: () => void;
  onChangeOpen?: () => void;
}

export const useBottomSheet = ({isOpened, onChangeClose, onChangeOpen}: UseBottomSheetProps) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(isOpened);
    if (!isOpened) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpened]);

  const handleClose = useCallback(() => {
    setOpened(false);
    if (onChangeClose) {
      onChangeClose();
    }
  }, []);

  const handleOpen = useCallback(() => {
    setOpened(true);
    if (onChangeOpen) {
      onChangeOpen();
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.addEventListener('keydown', handleKeyDownEsc);

    return () => {
      document.body.style.overflow = 'scroll';
      document.body.removeEventListener('keydown', handleKeyDownEsc);
    };
  }, [isOpened]);

  const handleKeyDownEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpened) {
      handleClose();
    }
  };

  return {opened, handleClose};
};
