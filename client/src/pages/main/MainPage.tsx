import {useNavigate} from 'react-router-dom';
import {ErrorBoundary} from '@sentry/react';
import {Suspense} from 'react';

import {Profile} from '@components/Design/components/Profile/Profile';
import MainPageError from '@pages/fallback/MainPageError';
import MainPageLoading from '@pages/fallback/MainPageLoading';
import ContentItem from '@components/Design/components/ContentItem/ContentItem';
import HStack from '@components/Design/components/Stack/HStack';
import useRequestGetCreatedEvents from '@hooks/queries/event/useRequestGetCreatedEvents';
import VStack from '@components/Design/components/Stack/VStack';
import {CreatedEventView} from '@components/Design/components/CreatedEventItem/CreatedEventView';
import EventEmptyFallback from '@pages/fallback/EventEmptyFallback';
import {IconHeundeut} from '@components/Design/components/Icons/Icons/IconHeundeut';
import {IconSetting} from '@components/Design/components/Icons/Icons/IconSetting';

import useUserInfoContext from '@hooks/useUserInfoContext';

import {FixedButton, MainLayout, Text, TopNav} from '@components/Design';

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
        {accountNumber === '' ? '기본 계좌번호를 설정하여\n 행사마다 입력하는 번거로움을 줄이세요' : accountNumber}
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
        <VStack css={{width: '100%'}}>
          {slicedEvents.map(event => (
            <CreatedEventView key={event.eventId} {...event} />
          ))}
        </VStack>
      )}
    </ContentItem>
  );
};

const MainPage = () => {
  const navigate = useNavigate();

  const navigateCreateEvent = () => {
    navigate(ROUTER_URLS.createUserEvent);
  };

  const navigateSettingPage = () => {
    navigate(ROUTER_URLS.setting);
  };

  return (
    <MainLayout backgroundColor="gray">
      <TopNav
        left={
          <>
            <TopNav.Icon routePath="/" aria-label="행동대장 로고" component={<IconHeundeut />} />
            <TopNav.Text routePath="/" textSize="subTitle" isEmphasis={true}>
              행동대장
            </TopNav.Text>
          </>
        }
        right={
          <TopNav.Icon
            routePath="/"
            aria-label="행동대장 로고"
            component={<IconSetting size={24} />}
            onClick={navigateSettingPage}
          />
        }
      />
      <VStack gap="0.5rem" p="1rem" css={{width: '100%'}}>
        <ErrorBoundary fallback={<MainPageError />}>
          <Suspense fallback={<MainPageLoading />}>
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

export default MainPage;
