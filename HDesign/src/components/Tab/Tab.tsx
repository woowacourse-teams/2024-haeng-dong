/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React, {useState} from 'react';

import Text from '@components/Text/Text';

import {useTheme} from '@theme/HDesignProvider';

import {tabListStyle, tabTextStyle, tabStyle, tabItemStyle, indicatorStyle} from './Tab.style';
import {TabsProps} from './Tab.type';

const Tab: React.FC<TabsProps> = ({tabs}) => {
  const {theme} = useTheme();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const isActive = (index: number) => {
    return activeTabIndex === index;
  };

  return (
    <section css={tabStyle}>
      <ul role="tablist" css={tabListStyle(theme)}>
        {tabs.map((tab, index) => (
          <li
            key={tab.label}
            role="tab"
            id={`tab-${tab.label}`}
            css={tabItemStyle}
            aria-selected={isActive(index)}
            onClick={() => setActiveTabIndex(index)}
            aria-controls={`tabpanel-${tab.label}`}
          >
            <Text css={tabTextStyle(theme, isActive(index))} size={isActive(index) ? 'bodyBold' : 'body'}>
              {tab.label}
            </Text>
          </li>
        ))}
        <div css={indicatorStyle(theme, `${(activeTabIndex * 100) / tabs.length}%`, tabs.length)} />
      </ul>
      {tabs.map((tab, index) => (
        <section
          key={tab.label}
          role="tabpanel"
          id={`tabpanel-${tab.label}`}
          aria-labelledby={`tab-${tab.label}`}
          hidden={activeTabIndex !== index}
        >
          {tab.content}
        </section>
      ))}
    </section>
  );
};

export default Tab;
