import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {useAuthStore} from '@store/authStore';

import getKakaoRedirectUrl from '@utils/getKakaoRedirectUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

import useRequestGetKakaoClientId from './queries/auth/useRequestGetKakaoClientId';
import useAmplitude from './useAmplitude';
import useRequestGetKakaoLogin from './queries/auth/useRequestGetKakaoLogin';

const useLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {trackStartCreateEvent} = useAmplitude();
  const {updateAuth} = useAuthStore();
  const {requestGetKakaoLogin} = useRequestGetKakaoLogin();

  const {requestGetClientId} = useRequestGetKakaoClientId();

  const goKakaoLogin = async () => {
    const queryResult = await requestGetClientId();
    const clientId = queryResult.data?.clientId;

    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${getKakaoRedirectUrl()}&response_type=code`;
    window.location.href = link;
  };

  const goNonLoginCreateEvent = () => {
    trackStartCreateEvent({login: false});
    navigate(ROUTER_URLS.createEvent);
  };

  useEffect(() => {
    if (location.search === '') return;

    const code = new URLSearchParams(location.search).get('code');

    const kakaoLogin = async () => {
      if (code) {
        await requestGetKakaoLogin();
        updateAuth(true);

        // 추후에 업데이트 하는 로직 필요
        trackStartCreateEvent({login: true});
        navigate(ROUTER_URLS.createEvent);
      }
    };

    kakaoLogin();
  }, [location.search]);

  return {goKakaoLogin, goNonLoginCreateEvent};
};

export default useLoginPage;
