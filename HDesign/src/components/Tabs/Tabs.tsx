/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from '@emotion/react';

import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';
import Flex from '../Flex/Flex';

import {tabListStyle, indicatorStyle, tabItemStyle, tabTextStyle} from './Tabs.style';
import {TabsProps} from './Tab.type';

const Tabs: React.FC<TabsProps> = ({children, tabsContainerStyle}) => {
  const {theme} = useTheme();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const isActive = (index: number) => activeTabIndex === index;
  const tabItemCount = children.length;

  return (
    <Flex flexDirection="column" {...tabsContainerStyle}>
      <ul role="tablist" css={tabListStyle(theme)}>
        <Flex justifyContent="spaceBetween" alignItems="center" padding="0.5rem">
          {children.map((tabItem, index) => (
            <li
              key={tabItem.props.label}
              role="tab"
              id={`tab-${tabItem.props.label}`}
              css={tabItemStyle}
              aria-selected={isActive(index)}
              onClick={() => setActiveTabIndex(index)}
              aria-controls={`tabpanel-${tabItem.props.label}`}
            >
              <Text css={tabTextStyle(theme, isActive(index))} size={isActive(index) ? 'bodyBold' : 'body'}>
                {tabItem.props.label}
              </Text>
            </li>
          ))}
          <div css={indicatorStyle(theme, `${(activeTabIndex * 100) / tabItemCount}%`, tabItemCount)} />
        </Flex>
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
