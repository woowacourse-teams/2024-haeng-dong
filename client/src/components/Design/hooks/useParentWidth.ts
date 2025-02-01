import {useEffect, useRef, useState} from 'react';
import {throttle} from 'lodash';

interface UseParentWidthProps {
  elementRef: React.RefObject<HTMLDivElement>;
  delay?: number;
}

export const useParentWidth = ({elementRef, delay = 16}: UseParentWidthProps) => {
  const [parentWidth, setParentWidth] = useState<number>(0);
  const count = useRef(0);

  useEffect(() => {
    const handleResize = throttle(() => {
      if (elementRef.current) {
        const parentElement = elementRef.current.parentElement;
        setParentWidth(parentElement?.clientWidth ?? 0);
      }
    }, delay);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef, delay]);

  return parentWidth;
};
