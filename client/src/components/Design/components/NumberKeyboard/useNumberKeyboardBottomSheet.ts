import {useEffect} from 'react';

interface Props {
  isOpened: boolean;
  bottomSheetRef: React.RefObject<HTMLDivElement>;
}

const useNumberKeyboardBottomSheet = ({isOpened, bottomSheetRef}: Props) => {
  useEffect(() => {
    const bottomSheet = bottomSheetRef.current;
    if (!bottomSheet) return;

    const preventScroll = (e: TouchEvent) => {
      if (bottomSheet.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    if (isOpened) {
      document.addEventListener('touchmove', preventScroll, {passive: false});
    }

    return () => {
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpened]);

  return {bottomSheetRef};
};

export default useNumberKeyboardBottomSheet;
