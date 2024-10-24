import {useCallback, useRef} from 'react';

interface Props {
  id: number;
  billDetailsRef: React.RefObject<HTMLDivElement>;
}

const useEditBillPageScroll = () => {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const handleScrollToFocus = useCallback(({id, billDetailsRef}: Props) => {
    setTimeout(() => {
      if (billDetailsRef.current) {
        const selectedItem = billDetailsRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement;
        if (selectedItem && keyboardRef.current) {
          const itemTop = selectedItem.offsetTop;
          const itemHeight = selectedItem.offsetHeight;
          const itemBottom = itemTop + itemHeight;
          const keyboardTop = keyboardRef.current.offsetTop;

          const targetScrollTop = itemBottom < keyboardTop ? 0 : itemTop - (keyboardTop - itemHeight) / 2;

          window.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
          });
        }
      }
    }, 100);
  }, []);

  return {keyboardRef, handleScrollToFocus};
};

export default useEditBillPageScroll;
