/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';

import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {tabListStyle, tabItemStyle, tabTextStyle, indicatorStyle} from './Tabs.style';
import {TabsProps} from './Tab.type';

const Tabs: React.FC<TabsProps> = ({children, tabsContainerStyle}) => {
  const {theme} = useTheme();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabWidth, setTabWidth] = useState(0);
  const tabRef = useRef<HTMLLIElement>(null);

  const isActive = (index: number) => activeTabIndex === index;

  const setTabWidthResizeObserveCallback = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.target === tabRef.current) {
        setTabWidth(entry.contentRect.width);
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

  return (
    <Flex flexDirection="column" {...tabsContainerStyle}>
      <ul role="tablist" css={tabListStyle({theme})}>
        <Flex
          justifyContent="spaceBetween"
          alignItems="center"
          height="100%"
          padding="0.5rem"
          paddingInline="0.5rem"
          gap="0.5rem"
        >
          {children.map((tabItem, index) => (
            <li
              ref={tabRef}
              key={tabItem.props.label}
              role="tab"
              id={`tab-${tabItem.props.label}`}
              css={tabItemStyle}
              aria-selected={isActive(index)}
              onClick={() => setActiveTabIndex(index)}
              aria-controls={`tabpanel-${tabItem.props.label}`}
            >
              <Text css={tabTextStyle({theme, selected: isActive(index)})} size={isActive(index) ? 'bodyBold' : 'body'}>
                {tabItem.props.label}
              </Text>
            </li>
          ))}
        </Flex>
        {tabRef.current && tabWidth !== 0 && <div css={indicatorStyle({theme, tabWidth, activeTabIndex})} />}
      </ul>
      <section
        role="tabpanel"
        id={`tabpanel-${children[activeTabIndex].props.label}`}
        aria-labelledby={`tab-${children[activeTabIndex].props.label}}`}
      >
        {children[activeTabIndex].props.content}
      </section>
    </Flex>
  );
};

export default Tabs;
