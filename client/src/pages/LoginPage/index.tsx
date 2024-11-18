import {useNavigate} from 'react-router-dom';

import Image from '@components/Design/components/Image/Image';

import {Button, Flex, FunnelLayout, Icon, MainLayout, Text, TopNav, useTheme} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

import {hrStyle} from './LoginPage.style';

const LoginPage = () => {
  const {theme} = useTheme();
  const navigate = useNavigate();

  const goNonLoginCreateEvent = () => {
    navigate(ROUTER_URLS.createEvent);
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <Flex flexDirection="column" justifyContent="spaceBetween" height="100%">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="1rem" margin="0 0 6rem 0">
            <Image src={getImageUrl('heundeut', 'webp')} fallbackSrc={getImageUrl('heundeut', 'png')} />
            <Text size="bodyBold" css={{whiteSpace: 'pre-line', textAlign: 'center'}}>
              {`로그인을 사용하면\n더 편하게 사용할 수 있어요`}
            </Text>
          </Flex>
          <Flex flexDirection="column" gap="1rem" width="100%" padding="0 2rem" paddingInline="auto">
            <Button variants="kakao">
              <Flex alignItems="center" gap="0.625rem">
                <Icon iconType="kakao" />
                카카오 로그인
              </Flex>
            </Button>
            <hr css={hrStyle(theme)} />
            <Button variants="secondary" onClick={goNonLoginCreateEvent}>
              비회원으로 진행하기
            </Button>
          </Flex>
        </Flex>
      </FunnelLayout>
    </MainLayout>
  );
};

export default LoginPage;
