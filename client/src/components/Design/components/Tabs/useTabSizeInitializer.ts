import {useEffect, useState} from 'react';

export const useTabSizeInitializer = (tabRefs: React.MutableRefObject<(HTMLLIElement | null)[]>) => {
  const [tabWidth, setTabWidth] = useState(0);

  const setTabWidthResizeObserveCallback = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.target === tabRefs.current[0]) {
        setTabWidth(entry.contentRect.width);
      }
    }
  };

  useEffect(() => {
    const tabCurrent = tabRefs.current[0];

    if (tabCurrent) {
      const resizeObserver = new ResizeObserver(setTabWidthResizeObserveCallback);
      resizeObserver.observe(tabCurrent);

      return () => {
        resizeObserver.unobserve(tabCurrent);
      };
    }

    // useEffect 경고문구 제거를 위해 return 추가 (Not all code paths return a value.)
    return;
  }, [tabRefs]);

  return tabWidth;
};
