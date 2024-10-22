import type {Event} from 'types/serviceType';

import {Outlet} from 'react-router-dom';
import {useEffect} from 'react';

import useEventPageLayout from '@hooks/useEventPageLayout';
import useShareEvent from '@hooks/useShareEvent';
import useAmplitude from '@hooks/useAmplitude';

import {Footer} from '@components/Footer';
import {DesktopShareEventButton, MobileShareEventButton} from '@components/ShareEventButton';

import {Flex, Icon, IconButton, MainLayout, TopNav} from '@HDesign/index';

import {isMobileDevice} from '@utils/detectDevice';
import {updateMetaTag} from '@utils/udpateMetaTag';

export type EventPageContextProps = Event & {
  isAdmin: boolean;
  eventToken: string;
};

const EventPageLayout = () => {
  const {isAdmin, event, eventId, eventSummary} = useEventPageLayout();
  const outletContext: EventPageContextProps = {
    isAdmin,
    eventToken: eventId,
    ...event,
  };
  const {trackShareEvent} = useAmplitude();

  const isMobile = isMobileDevice();
  const {kakaoShare, copyShare} = useShareEvent({eventName: event.eventName});

  const trackLinkShare = async () => {
    trackShareEvent({...eventSummary, shareMethod: 'link'});
    await copyShare();
  };

  const trackKakaoShare = () => {
    trackShareEvent({...eventSummary, shareMethod: 'kakao'});
    kakaoShare();
  };

  useEffect(() => {
    updateMetaTag('og:title', `행동대장이 "${eventSummary.eventName}"에 대한 정산을 요청했어요`);

    return () => {
      updateMetaTag('og:title', '행동대장 - 쉽고 빠른 모임 정산 및 송금 서비스');
    };
  }, []);

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
          <MobileShareEventButton copyShare={trackLinkShare} kakaoShare={trackKakaoShare} />
        ) : (
          <DesktopShareEventButton onCopy={trackLinkShare} />
        )}
      </Flex>
      <Outlet context={outletContext} />
      <Footer />
    </MainLayout>
  );
};

export default EventPageLayout;
