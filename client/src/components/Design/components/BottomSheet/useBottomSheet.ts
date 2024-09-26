import {useCallback, useEffect, useRef, useState} from 'react';

interface UseBottomSheetProps {
  isOpened: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const useBottomSheet = ({isOpened, onClose, onOpen}: UseBottomSheetProps) => {
  const [opened, setOpened] = useState(isOpened);
  const [visible, setVisible] = useState(isOpened);

  const [isDragging, setIsDragging] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const startY = useRef(0);

  useEffect(() => {
    if (opened) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);

      return () => clearTimeout(timer);
    }

    return;
  }, [opened]);

  useEffect(() => {
    setOpened(isOpened);
    if (!isOpened) {
      handleClose();
    } else {
      handleOpen();
    }

    document.body.style.overflow = 'hidden';
    document.body.addEventListener('keydown', handleKeyDownEsc);

    return () => {
      document.body.style.overflow = 'scroll';
      document.body.removeEventListener('keydown', handleKeyDownEsc);
    };
  }, [isOpened]);

  const handleClose = useCallback(() => {
    setOpened(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleOpen = useCallback(() => {
    setOpened(true);
    if (onOpen) {
      onOpen();
    }
  }, [onOpen]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    startY.current = 'touches' in e ? e.touches[0].clientY : e.clientY;
  };

  const handleDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startY.current;
    setTranslateY(Math.max(deltaY, 0));
  };

  const threshold = window.screen.height / 10;

  const handleDragEnd = () => {
    setIsDragging(false);
    if (translateY > threshold) {
      handleClose();
    }
    setTranslateY(0);
  };

  const handleKeyDownEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpened) {
      handleClose();
    }
  };

  return {opened, visible, handleClose, handleDragStart, handleDrag, handleDragEnd, isDragging, translateY};
};
