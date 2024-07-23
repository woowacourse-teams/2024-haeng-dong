/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from '@emotion/react';

import {useTheme} from '@theme/HDesignProvider';
import {tabListStyle, tabStyle, indicatorStyle, tabItemStyle, tabTextStyle} from './Tabs.style';
import {TabsProps} from './Tab.type';
import Text from '../Text/Text';

const Tabs: React.FC<TabsProps> = ({children}) => {
  const {theme} = useTheme();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const isActive = (index: number) => activeTabIndex === index;
  const tabItemCount = children.length;

  return (
    <section css={tabStyle}>
      <ul role="tablist" css={tabListStyle(theme)}>
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
      </ul>
      <section
        role="tabpanel"
        id={`tabpanel-${children[activeTabIndex].props.label}`}
        aria-labelledby={`tab-${children[activeTabIndex].props.label}}`}
      >
        {children[activeTabIndex].props.content}
      </section>
    </section>
  );
};

export default Tabs;
