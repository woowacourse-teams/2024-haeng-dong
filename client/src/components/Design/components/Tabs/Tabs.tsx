/** @jsxImportSource @emotion/react */
import React, {cloneElement, useEffect, useRef, useState} from 'react';

import {useTheme} from '@theme/HDesignProvider';

import SessionStorage from '@utils/SessionStorage';
import getEventIdByUrl from '@utils/getEventIdByUrl';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

import Flex from '../Flex/Flex';

import {tabListStyle, indicatorStyle} from './Tabs.style';
import {TabProps, TabsProps} from './Tab.type';
import {TabContext} from './useTabContext';
import {useTabSizeInitializer} from './useTabSizeInitializer';

const Tabs: React.FC<TabsProps> = ({children, tabsContainerStyle}) => {
  const {theme} = useTheme();
  const tabRefs = useRef<Array<HTMLLIElement | null>>([]);
  const tabWidth = useTabSizeInitializer(tabRefs);

  const eventId = getEventIdByUrl();
  const [activeTabIndex, setActiveTabIndex] = useState(
    SessionStorage.get<{eventId: string; activeTabIndex: number}>(SESSION_STORAGE_KEYS.eventHomeTab)?.activeTabIndex ??
      0,
  );

  useEffect(() => {
    SessionStorage.set(SESSION_STORAGE_KEYS.eventHomeTab, {eventId, activeTabIndex});
  }, [activeTabIndex, eventId]);

  const handleActiveTabIndex = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <TabContext.Provider
      value={{
        handleActiveTabIndex,
      }}
    >
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
            {children.map((tabItem, index) =>
              cloneElement(tabItem as React.ReactElement<TabProps>, {
                ref: (el: HTMLLIElement) => (tabRefs.current[index] = el),
                selected: activeTabIndex === index,
                index,
              }),
            )}
          </Flex>
          {tabRefs.current && tabWidth !== 0 && (
            <li value={activeTabIndex} css={indicatorStyle({theme, tabWidth, activeTabIndex})} />
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
