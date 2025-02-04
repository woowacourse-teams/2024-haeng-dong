import {useEffect, useState} from 'react';

type UseTabIndicatorWidthInitializerArgs = {
  tabRef: React.MutableRefObject<HTMLUListElement | null>;
  tabLength: number;
};

export const useTabIndicatorWidthInitializer = ({tabRef, tabLength}: UseTabIndicatorWidthInitializerArgs) => {
  const [tabIndicatorWidth, setTabIndicatorWidth] = useState(0);

  const setTabWidthResizeObserveCallback = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.target === tabRef.current) {
        const padding = 16;
        const totalGap = (tabLength - 1) * 8;

        setTabIndicatorWidth((entry.contentRect.width - padding - totalGap) / tabLength);
      }
    }
  };

  useEffect(() => {
    const tabCurrent = tabRef.current;

    if (tabCurrent) {
      const resizeObserver = new ResizeObserver(setTabWidthResizeObserveCallback);
      resizeObserver.observe(tabCurrent);

      return () => {
        resizeObserver.unobserve(tabCurrent);
      };
    }

    // useEffect 경고문구 제거를 위해 return 추가 (Not all code paths return a value.)
    return;
  }, [tabRef]);

  return tabIndicatorWidth;
};
