import Image from '@components/Design/components/Image/Image';

import useLoginPage from '@hooks/useLoginPage';

import {Button, Flex, FunnelLayout, Icon, MainLayout, Text, TopNav, useTheme} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {hrStyle} from './LoginPage.style';

const LOGIN_COMMENT = `로그인을 하면 계좌번호를 저장하고\n이전 행사들을 쉽게 볼 수 있어요.`;

const LoginPage = () => {
  const {theme} = useTheme();

  const {goKakaoLogin, goNonLoginCreateEvent} = useLoginPage();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Flex flexDirection="column" justifyContent="spaceBetween" height="100%">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="1rem" margin="0 0 6rem 0">
            <Image src={getImageUrl('heundeut', 'webp')} fallbackSrc={getImageUrl('heundeut', 'png')} width={109} />
            <Text size="bodyBold" css={{whiteSpace: 'pre-line', textAlign: 'center'}}>
              {LOGIN_COMMENT}
            </Text>
          </Flex>
          <Flex flexDirection="column" gap="1rem" width="100%" padding="0 2rem" paddingInline="auto">
            <Button variants="kakao" size="large" onClick={goKakaoLogin}>
              <Flex alignItems="center" gap="0.625rem">
                <Icon iconType="kakao" />
                카카오 로그인
              </Flex>
            </Button>
            <hr css={hrStyle(theme)} />
            <Button variants="secondary" size="large" onClick={goNonLoginCreateEvent}>
              비회원으로 진행하기
            </Button>
          </Flex>
        </Flex>
      </FunnelLayout>
    </MainLayout>
  );
};

export default LoginPage;
