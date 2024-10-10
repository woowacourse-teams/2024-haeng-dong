import type {Event} from 'types/serviceType';

import {Outlet} from 'react-router-dom';

import useEventPageLayout from '@hooks/useEventPageLayout';
import useShareEvent from '@hooks/useShareEvent';

import {Footer} from '@components/Footer';
import {DesktopShareEventButton, MobileShareEventButton} from '@components/ShareEventButton';

import {Flex, Icon, IconButton, MainLayout, TopNav} from '@HDesign/index';

import {isMobileDevice} from '@utils/detectDevice';

export type EventPageContextProps = Event & {
  isAdmin: boolean;
};

const EventPageLayout = () => {
  const {isAdmin, event} = useEventPageLayout();
  const outletContext: EventPageContextProps = {
    isAdmin,
    ...event,
  };

  const isMobile = isMobileDevice();

  const {shareText, onShareButtonClick} = useShareEvent({event, isMobile});

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
          <MobileShareEventButton text="카카오톡으로 초대하기" onClick={onShareButtonClick} />
        ) : (
          <DesktopShareEventButton text="정산 초대하기" shareText={shareText} onClick={onShareButtonClick} />
        )}
      </Flex>
      <Outlet context={outletContext} />
      <Footer />
    </MainLayout>
  );
};

export default EventPageLayout;
