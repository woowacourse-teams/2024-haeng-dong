import {useNavigate} from 'react-router-dom';
import {ErrorBoundary} from '@sentry/react';
import {Suspense} from 'react';

import {Profile} from '@components/Design/components/Profile/Profile';
import LoungePageError from '@pages/fallback/LoungePageError';
import LoungePageLoading from '@pages/fallback/LoungePageLoading';
import ContentItem from '@components/Design/components/ContentItem/ContentItem';
import HStack from '@components/Design/components/Stack/HStack';
import useRequestGetCreatedEvents from '@hooks/queries/event/useRequestGetCreatedEvents';
import VStack from '@components/Design/components/Stack/VStack';
import {CreatedEventView} from '@components/Design/components/CreatedEventItem/CreatedEventView';
import EventEmptyFallback from '@pages/fallback/EventEmptyFallback';

import useUserInfoContext from '@hooks/useUserInfoContext';

import {FixedButton, MainLayout, Text} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

const UserInfoSection = () => {
  const {nickname, profileImage} = useUserInfoContext();
  const navigate = useNavigate();

  const navigateEditUserPage = () => {
    navigate(ROUTER_URLS.editUserNickname);
  };

  return (
    <ContentItem onEditClick={navigateEditUserPage}>
      <HStack gap="1rem">
        <Profile src={profileImage ? profileImage : getImageUrl('runningDog', 'png')} size="medium" />
        <Text size="bodyBold" textColor="onTertiary">
          {nickname}
        </Text>
      </HStack>
    </ContentItem>
  );
};

const AccountSection = () => {
  const {accountNumber} = useUserInfoContext();
  const navigate = useNavigate();

  const navigateEditAccountPage = () => {
    navigate(ROUTER_URLS.editUserAccount);
  };

  return (
    <ContentItem labels={<ContentItem.Label>기본 계좌번호</ContentItem.Label>} onEditClick={navigateEditAccountPage}>
      <Text textColor="black" size="bodyBold">
        {accountNumber}
      </Text>
    </ContentItem>
  );
};

const CreatedEventsSection = () => {
  const navigate = useNavigate();
  const {events} = useRequestGetCreatedEvents();
  const slicedEvents = events?.slice(0, 10) ?? [];

  const navigateCreatedEventsPage = () => {
    navigate(ROUTER_URLS.createdEvents);
  };

  return (
    <ContentItem
      labels={
        <>
          <ContentItem.Label>나의 행사목록</ContentItem.Label>
          <ContentItem.Label onClick={navigateCreatedEventsPage}>전체보기</ContentItem.Label>
        </>
      }
    >
      {slicedEvents.length === 0 ? (
        <EventEmptyFallback />
      ) : (
        <VStack>
          {slicedEvents.map(event => (
            <CreatedEventView key={event.eventId} {...event} />
          ))}
        </VStack>
      )}
    </ContentItem>
  );
};

const Lounge = () => {
  const navigate = useNavigate();

  const navigateCreateEvent = () => {
    navigate(ROUTER_URLS.createUserEvent);
  };

  return (
    <MainLayout backgroundColor="gray">
      <VStack gap="0.5rem" p="1rem" css={{width: '100%'}}>
        <ErrorBoundary fallback={<LoungePageError />}>
          <Suspense fallback={<LoungePageLoading />}>
            <UserInfoSection />
            <AccountSection />
            <CreatedEventsSection />
          </Suspense>
        </ErrorBoundary>
      </VStack>
      <FixedButton variants="primary" onClick={navigateCreateEvent}>
        행사 생성하기
      </FixedButton>
    </MainLayout>
  );
};

export default Lounge;
