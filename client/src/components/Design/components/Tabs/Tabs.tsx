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
  const tabItemCount = children.length;

  const calculateTabWidth = () => {
    if (tabRef.current) {
      setTabWidth(tabRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    calculateTabWidth();

    window.addEventListener('resize', calculateTabWidth);

    return () => {
      window.removeEventListener('resize', calculateTabWidth);
    };
  }, [tabItemCount]);

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
        <div css={indicatorStyle({theme, tabWidth, activeTabIndex})} />
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
