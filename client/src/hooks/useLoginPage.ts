import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {requestGetKakaoLogin} from '@apis/request/auth';

import {ROUTER_URLS} from '@constants/routerUrls';

import useRequestGetKakaoClientId from './queries/auth/useRequestGetKakaoClientId';
import useAmplitude from './useAmplitude';

const useLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {trackStartCreateEvent} = useAmplitude();

  const {requestGetClientId} = useRequestGetKakaoClientId();

  const goKakaoLogin = async () => {
    const queryResult = await requestGetClientId();
    const clientId = queryResult.data?.clientId;
    const redirectUri =
      process.env.NODE_ENV === 'development'
        ? 'https://localhost:3000' + process.env.KAKAO_REDIRECT_URI
        : 'https://haengdong.pro' + process.env.KAKAO_REDIRECT_URI;

    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
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
        await requestGetKakaoLogin(code);
        // 로그인 처리 후 (백엔드와 논의해서 로그인 유지 기능 추가)
        trackStartCreateEvent({login: true});
        navigate(ROUTER_URLS.createEvent);
      }
    };

    kakaoLogin();
  }, [location.search]);

  return {goKakaoLogin, goNonLoginCreateEvent};
};

export default useLoginPage;
