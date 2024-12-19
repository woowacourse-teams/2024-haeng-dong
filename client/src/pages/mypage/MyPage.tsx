import {useNavigate} from 'react-router-dom';

import Container from '@pages/mypage/Container';
import {Profile} from '@components/Design/components/Profile/Profile';

import useMyPage from '@hooks/useMyPage';

import {Flex, FunnelLayout, MainLayout, Text, TextButton, TopNav, useTheme} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

const MyPage = () => {
  const navigate = useNavigate();
  const {profileImage, nickname} = useMyPage();

  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Container>
          <Flex justifyContent="spaceBetween" alignItems="center" margin="0 1rem">
            <Flex gap="1rem" alignItems="center">
              <Profile src={profileImage ?? getImageUrl('runningDog', 'png')} size="medium" />
              <Text size="bodyBold" textColor="onTertiary">
                {nickname}
              </Text>
            </Flex>
          </Flex>
        </Container>
        <Container>
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
        </Container>
      </FunnelLayout>
    </MainLayout>
  );
};

export default MyPage;
