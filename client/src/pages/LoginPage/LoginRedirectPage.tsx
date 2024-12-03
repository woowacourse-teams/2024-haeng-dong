import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Image from '@components/Design/components/Image/Image';
import useRequestGetKakaoLogin from '@hooks/queries/auth/useRequestGetKakaoLogin';

import useAmplitude from '@hooks/useAmplitude';

import {useAuthStore} from '@store/authStore';

import {FunnelLayout, MainLayout, Text, Top} from '@components/Design';

import getImageUrl from '@utils/getImageUrl';
import SessionStorage from '@utils/SessionStorage';

import {ROUTER_URLS} from '@constants/routerUrls';
import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

const LoginRedirectPage = () => {
  const navigate = useNavigate();
  const {requestGetKakaoLogin} = useRequestGetKakaoLogin();
  const {updateAuth} = useAuthStore();
  const {trackStartCreateEvent} = useAmplitude();

  useEffect(() => {
    if (location.search === '') return;

    const code = new URLSearchParams(location.search).get('code');
    const previousUrlForLogin = SessionStorage.get<string>(SESSION_STORAGE_KEYS.previousUrlForLogin);

    const kakaoLogin = async () => {
      if (!code) return;

      await requestGetKakaoLogin();
      SessionStorage.remove(SESSION_STORAGE_KEYS.previousUrlForLogin);

      updateAuth(true);
      trackStartCreateEvent({login: true});

      if (previousUrlForLogin) {
        navigate(previousUrlForLogin, {replace: true});
      } else {
        navigate(ROUTER_URLS.createMemberEvent);
      }
    };

    kakaoLogin();
  }, [location.search]);

  return (
    <MainLayout backgroundColor="white">
      <FunnelLayout>
        <Text size="title" textColor="onTertiary">
          로그인 중
        </Text>
        <Top>
          <Top.Line text="로그인이 완료될 때까지" />
          <Top.Line text="잠시만 기다려주세요" />
        </Top>
        <Image src={getImageUrl('runningDog', 'webp')} fallbackSrc={getImageUrl('runningDog', 'png')} width={300} />
      </FunnelLayout>
    </MainLayout>
  );
};

export default LoginRedirectPage;
