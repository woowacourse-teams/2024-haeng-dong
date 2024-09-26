import {useCallback} from 'react';

interface Props {
  id: number;
  billDetailsRef: React.RefObject<HTMLDivElement>;
}

const useEditBillPageScroll = () => {
  const handleScrollToFocus = useCallback(({id, billDetailsRef}: Props) => {
    setTimeout(() => {
      if (billDetailsRef.current) {
        const selectedItem = billDetailsRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement;
        if (selectedItem) {
          const screenHeight = window.screen.height;
          const keyboardHeight = 416;
          const itemTop = selectedItem.offsetTop;
          const itemHeight = selectedItem.offsetHeight;
          const itemBottom = itemTop + itemHeight;
          const visibleY = screenHeight - keyboardHeight;

          const targetScrollTop = itemBottom < visibleY ? 0 : itemTop - (visibleY - itemHeight) / 2;

          window.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
          });
        }
      }
    }, 100);
  }, []);

  return {handleScrollToFocus};
};

export default useEditBillPageScroll;
