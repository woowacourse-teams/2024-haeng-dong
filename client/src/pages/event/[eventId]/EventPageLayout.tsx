import type {Event} from 'types/serviceType';

import {Link, Outlet} from 'react-router-dom';
import {useEffect} from 'react';

import {Profile} from '@components/Design/components/Profile/Profile';

import useEventPageLayout from '@hooks/useEventPageLayout';
import useShareEvent from '@hooks/useShareEvent';
import useAmplitude from '@hooks/useAmplitude';

import {Footer} from '@components/Footer';
import {DesktopShareEventButton, MobileShareEventButton} from '@components/ShareEventButton';

import {Flex, Icon, IconButton, MainLayout, TopNav} from '@HDesign/index';

import {isMobileDevice} from '@utils/detectDevice';
import {updateMetaTag} from '@utils/udpateMetaTag';
import getImageUrl from '@utils/getImageUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

export type EventPageContextProps = Event & {
  isAdmin: boolean;
  eventToken: string;
};

const EventPageLayout = () => {
  const {event, eventSummary} = useEventPageLayout();

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

  const isKakaoUser = event.userInfo && event.userInfo.isGuest === false;

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
        <Flex alignItems="center" gap="0.75rem" margin="0 1rem 0 0">
          {isMobile ? (
            <MobileShareEventButton copyShare={trackLinkShare} kakaoShare={trackKakaoShare} />
          ) : (
            <DesktopShareEventButton onCopy={trackLinkShare} />
          )}
          {isKakaoUser && (
            <Link to={ROUTER_URLS.myPage}>
              <Profile src={event.userInfo.profileImage ?? getImageUrl('runningDog', 'png')} size="medium" />
            </Link>
          )}
        </Flex>
      </Flex>
      <Outlet />
      <Footer />
    </MainLayout>
  );
};

export default EventPageLayout;
