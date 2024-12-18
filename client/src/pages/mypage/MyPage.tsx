import {useNavigate} from 'react-router-dom';

import {mockImageStyle} from '@pages/mypage/MyPage.style';
import Container from '@pages/mypage/Container';

import {Button, Flex, FunnelLayout, MainLayout, Text, TextButton, TopNav, useTheme} from '@components/Design';

import {ROUTER_URLS} from '@constants/routerUrls';

const MyPage = () => {
  const {theme} = useTheme();
  const navigate = useNavigate();

  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Container>
          <Flex justifyContent="spaceBetween" alignItems="center" margin="0 1rem">
            <Flex gap="1rem" alignItems="center">
              <div css={mockImageStyle(theme)}></div>
              <Text size="bodyBold" textColor="onTertiary">
                이름이 올 곳
              </Text>
            </Flex>
            <Button variants="tertiary" size="small">
              로그아웃
            </Button>
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
