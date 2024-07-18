import {useEffect, useState} from 'react';

interface UseBottomSheetProps {
  isOpened: boolean;
  onChangeClose?: () => void;
}

export const useBottomSheet = ({isOpened, onChangeClose}: UseBottomSheetProps) => {
  const [opened, setOpened] = useState(isOpened);

  useEffect(() => {
    setOpened(isOpened);
  }, [isOpened]);

  const handleClose = () => {
    setOpened(false);
    if (onChangeClose) {
      onChangeClose();
    }
  };

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
