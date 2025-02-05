import type {Event} from 'types/serviceType';

import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import {IconHeundeut} from '@components/Design/components/Icons/Icons/IconHeundeut';

import useEventPageLayout from '@hooks/useEventPageLayout';
import useShareEvent from '@hooks/useShareEvent';
import useAmplitude from '@hooks/useAmplitude';

import {Footer} from '@components/Footer';
import {DesktopShareEventButton, MobileShareEventButton} from '@components/ShareEventButton';

import {Flex, MainLayout, TopNav} from '@HDesign/index';

import {isMobileDevice} from '@utils/detectDevice';
import {updateMetaTag} from '@utils/udpateMetaTag';

import {PATHS, ROUTER_URLS} from '@constants/routerUrls';

export type EventPageContextProps = Event & {
  isAdmin: boolean;
  eventToken: string;
};

const EventPageLayout = () => {
  const {event, eventId, eventSummary} = useEventPageLayout();
  const {isGuest} = event.userInfo;

  const navigate = useNavigate();
  const {trackShareEvent} = useAmplitude();

  const navigate = useNavigate();

  const handleClickNavigateIconByUserStatus = () => {
    navigate(isGuest ? ROUTER_URLS.landing : ROUTER_URLS.main);
  };

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

  const trackQRShareAndNavigate = () => {
    trackShareEvent({...eventSummary, shareMethod: 'qr'});
    navigate(`/event/${eventId}/qrcode`);
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
        <TopNav
          left={
            <>
              <TopNav.Icon onClick={handleClickNavigateIconByUserStatus} component={<IconHeundeut />} />
              <TopNav.Text routePath={PATHS.home}>홈</TopNav.Text>
              <TopNav.Text routePath={PATHS.admin}>관리</TopNav.Text>
            </>
          }
        />
        <Flex alignItems="center" gap="0.75rem" margin="0 1rem 0 0">
          {isMobile ? (
            <MobileShareEventButton
              copyShare={trackLinkShare}
              kakaoShare={trackKakaoShare}
              qrShare={trackQRShareAndNavigate}
            />
          ) : (
            <DesktopShareEventButton copyShare={trackLinkShare} qrShare={trackQRShareAndNavigate} />
          )}
        </Flex>
      </Flex>
      <Outlet />
      <Footer />
    </MainLayout>
  );
};

export default EventPageLayout;
