import {useNavigate} from 'react-router-dom';

import Image from '@components/Design/components/Image/Image';

import {Button, FunnelLayout, MainLayout, Text, Top} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';

const LoginFailFallback = () => {
  const navigate = useNavigate();

  const goLandingPage = () => {
    navigate('/');
  };

  return (
    <MainLayout backgroundColor="white">
      <FunnelLayout>
        <Text size="title" textColor="onTertiary">
          로그인 실패
        </Text>
        <Top>
          <Top.Line text="로그인에 실패했습니다" />
          <Top.Line text="반복된다면 메일로 문의해주세요" />
        </Top>
        <Image src={getImageUrl('cryingDog', 'webp')} fallbackSrc={getImageUrl('cryingDog', 'png')} width={200} />
        <Button variants="secondary" size="large" onClick={goLandingPage}>
          홈으로 돌아가기
        </Button>
      </FunnelLayout>
    </MainLayout>
  );
};

export default LoginFailFallback;
