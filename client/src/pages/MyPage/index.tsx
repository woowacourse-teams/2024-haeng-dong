import {Button, Flex, FunnelLayout, MainLayout, Text, TextButton, TopNav, useTheme} from '@components/Design';

import {mockImageStyle} from './MyPage.style';
import Container from './Container';

const MyPage = () => {
  const {theme} = useTheme();

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
            <TextButton textColor="onTertiary" textSize="body">
              내가 만든 행사 목록 보기
            </TextButton>
            <TextButton textColor="onTertiary" textSize="body">
              탈퇴하기
            </TextButton>
          </Flex>
        </Container>
      </FunnelLayout>
    </MainLayout>
  );
};

export default MyPage;
