/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';

import {useTheme} from '@theme/HDesignProvider';

import SessionStorage from '@utils/SessionStorage';
import getEventIdByUrl from '@utils/getEventIdByUrl';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

import Flex from '../Flex/Flex';

import {tabListStyle, indicatorStyle} from './Tabs.style';
import {TabsProps} from './Tab.type';
import {TabContext} from './useTabContext';
import {useTabIndicatorWidthInitializer} from './useTabIndicatorWidthInitializer';
import Tab from './Tab';

const Tabs: React.FC<TabsProps> = ({children}) => {
  const {theme} = useTheme();
  const tabRef = useRef<HTMLUListElement>(null);

  const tabCount = React.Children.count(children);
  const tabIndicatorWidth = useTabIndicatorWidthInitializer({tabRef, tabCount});

  const eventId = getEventIdByUrl();

  const [activeTabIndex, setActiveTabIndex] = useState(
    SessionStorage.get<{eventId: string; activeTabIndex: number}>(SESSION_STORAGE_KEYS.eventHomeTab)?.activeTabIndex ??
      0,
  );

  useEffect(() => {
    SessionStorage.set(SESSION_STORAGE_KEYS.eventHomeTab, {eventId, activeTabIndex});
  }, [activeTabIndex, eventId]);

  const onClick = (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const targetValue = (event.target as HTMLElement).closest('li')?.dataset.label;
    const labels = children.map(child => child.props.label);
    const tabIndex = labels.findIndex(label => label === targetValue);

    if (targetValue) {
      setActiveTabIndex(tabIndex);
    }
  };

  return (
    <TabContext.Provider
      value={{
        activeTabIndex,
      }}
    >
      <Flex flexDirection="column">
        <ul ref={tabRef} role="tablist" css={tabListStyle({theme})} onClick={onClick}>
          <Flex
            justifyContent="spaceBetween"
            alignItems="center"
            height="100%"
            padding="0.5rem"
            paddingInline="0.5rem"
            gap="0.5rem"
          >
            {children.map((tabItem, index) => (
              <Tab key={index} label={tabItem.props.label} content={tabItem.props.content} index={index} />
            ))}
          </Flex>
          {tabRef.current && tabIndicatorWidth !== 0 && (
            <li css={indicatorStyle({theme, tabIndicatorWidth, activeTabIndex})} />
          )}
        </ul>
        <section
          role="tabpanel"
          id={`tabpanel-${children[activeTabIndex].props.label}`}
          aria-labelledby={`tab-${children[activeTabIndex].props.label}`}
        >
          {children[activeTabIndex].props.content}
        </section>
      </Flex>
    </TabContext.Provider>
  );
};

export default Tabs;
