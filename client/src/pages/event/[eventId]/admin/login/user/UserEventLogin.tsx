import Top from '@components/Design/components/Top/Top';

import useLoginPage from '@hooks/useLoginPage';

import {Button, Flex, FunnelLayout} from '@HDesign/index';

import getEventBaseUrl from '@utils/getEventBaseUrl';
import {IconKakao} from '@components/Design/components/Icons/Icons/IconKakao';

const UserEventLogin = () => {
  const {goKakaoLogin} = useLoginPage();
  const previousUrl = `${getEventBaseUrl(window.location.pathname)}/admin`;

  return (
    <FunnelLayout>
      <Top>
        <Top.Line text={`행사 관리 접근을 위해`} />
        <Top.Line text="카카오 계정 로그인을 해주세요." emphasize={['카카오 계정 로그인']} />
      </Top>
      <Button variants="kakao" size="large" onClick={() => goKakaoLogin(previousUrl)}>
        <Flex alignItems="center" gap="0.625rem">
          <IconKakao />
          카카오 로그인
        </Flex>
      </Button>
    </FunnelLayout>
  );
};

export default UserEventLogin;
