import type {Event} from 'types/serviceType';

import {Outlet} from 'react-router-dom';

import useEventPageLayout from '@hooks/useEventPageLayout';
import useShareEvent from '@hooks/useShareEvent';

import {DesktopShareEventButton, MobileShareEventButton} from '@components/ShareEventButton';

import {Flex, Icon, IconButton, MainLayout, TopNav} from '@HDesign/index';

import {isMobileDevice} from '@utils/detectDevice';

export type EventPageContextProps = Event & {
  isAdmin: boolean;
};

const EventPageLayout = () => {
  const {isAdmin, eventOutline} = useEventPageLayout();

  const outletContext: EventPageContextProps = {
    isAdmin,
    ...eventOutline,
  };

  const isMobile = isMobileDevice();
  const {kakaoShare, copyShare} = useShareEvent({eventName: eventOutline.eventName});

  return (
    <MainLayout backgroundColor="gray">
      <Flex justifyContent="spaceBetween" alignItems="center">
        <TopNav>
          <TopNav.Item routePath="/">
            <IconButton variants="none">
              <Icon iconType="heundeut" />
            </IconButton>
          </TopNav.Item>
          <TopNav.Item displayName="홈" routePath="/home" />
          <TopNav.Item displayName="관리" routePath="/admin" />
        </TopNav>
        {isMobile ? (
          <MobileShareEventButton copyShare={copyShare} kakaoShare={kakaoShare} />
        ) : (
          <DesktopShareEventButton onCopy={copyShare}>정산 초대하기</DesktopShareEventButton>
        )}
      </Flex>
      <Outlet context={outletContext} />
    </MainLayout>
  );
};

export default EventPageLayout;
