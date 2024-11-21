import Top from '@components/Design/components/Top/Top';

import useLoginPage from '@hooks/useLoginPage';

import {Button, Flex, FunnelLayout, Icon} from '@HDesign/index';

import getEventBaseUrl from '@utils/getEventBaseUrl';

const MemberEventLogin = () => {
  const {goKakaoLogin} = useLoginPage();
  const previousUrl = `${getEventBaseUrl(window.location.pathname)}/admin`;

  return (
    <FunnelLayout>
      <Top>
        <Top.Line text={`행사 관리 접근을 위해`} />
        <Top.Line text="카카오 계정 로그인을 해주세요." emphasize={['카카오 계정 로그인을 해주세요.']} />
      </Top>
      <Button variants="kakao" size="large" onClick={() => goKakaoLogin(previousUrl)}>
        <Flex alignItems="center" gap="0.625rem">
          <Icon iconType="kakao" />
          카카오 로그인
        </Flex>
      </Button>
    </FunnelLayout>
  );
};

export default MemberEventLogin;
