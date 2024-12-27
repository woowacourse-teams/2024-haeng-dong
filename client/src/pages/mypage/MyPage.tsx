import {useNavigate} from 'react-router-dom';
import {ErrorBoundary} from '@sentry/react';
import {Suspense} from 'react';

import {Profile} from '@components/Design/components/Profile/Profile';
import useRequestSuspenseGetUserInfo from '@hooks/queries/auth/useRequestSuspenseGetUserInfo';
import MyPageError from '@pages/fallback/MyPageError';
import MyPageLoading from '@pages/fallback/MyPageLoading';

import useUserInfoContext from '@hooks/useUserInfoContext';

import {Flex, FunnelLayout, MainLayout, Text, TextButton, TopNav} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

const SectionContainer = ({children}: React.PropsWithChildren) => {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      gap="0.5rem"
      backgroundColor="white"
      padding="1rem"
      css={{borderRadius: '0.75rem'}}
    >
      {children}
    </Flex>
  );
};

const UserInfoSection = () => {
  const {userInfo} = useRequestSuspenseGetUserInfo();
  const {profileImage, nickname} = userInfo;

  return (
    <SectionContainer>
      <Flex justifyContent="spaceBetween" alignItems="center" margin="0 1rem">
        <Flex gap="1rem" alignItems="center">
          <Profile src={profileImage ?? getImageUrl('runningDog', 'png')} size="large" />
          <Text size="bodyBold" textColor="onTertiary">
            {nickname}
          </Text>
        </Flex>
      </Flex>
    </SectionContainer>
  );
};

const SettingSection = () => {
  const navigate = useNavigate();

  const {nickname} = useUserInfoContext();

  return (
    <SectionContainer>
      <Flex flexDirection="column" margin="0 1.5rem" gap="1rem">
        <TextButton textColor="onTertiary" textSize="body">
          닉네임 설정하기
        </TextButton>
        <TextButton textColor="onTertiary" textSize="body">
          기본 계좌 번호 설정하기
        </TextButton>
        <TextButton textColor="onTertiary" textSize="body" onClick={() => navigate(ROUTER_URLS.createdEvents)}>
          내가 만든 행사 목록 보기
        </TextButton>
        <TextButton textColor="onTertiary" textSize="body" onClick={() => navigate(ROUTER_URLS.withdraw)}>
          탈퇴하기
        </TextButton>
      </Flex>
    </SectionContainer>
  );
};

const MyPage = () => {
  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <ErrorBoundary fallback={<MyPageError />}>
          <Suspense fallback={<MyPageLoading />}>
            <UserInfoSection />
            <SettingSection />
          </Suspense>
        </ErrorBoundary>
      </FunnelLayout>
    </MainLayout>
  );
};

export default MyPage;
