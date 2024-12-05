import {useNavigate} from 'react-router-dom';

import getKakaoRedirectUrl from '@utils/getKakaoRedirectUrl';
import SessionStorage from '@utils/SessionStorage';

import {ROUTER_URLS} from '@constants/routerUrls';
import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

import useRequestGetKakaoClientId from './queries/auth/useRequestGetKakaoClientId';
import useAmplitude from './useAmplitude';

const useLoginPage = () => {
  const navigate = useNavigate();
  const {trackStartCreateEvent} = useAmplitude();

  const {requestGetClientId} = useRequestGetKakaoClientId();

  const goKakaoLogin = async (previousUrl?: string) => {
    const queryResult = await requestGetClientId();
    const clientId = queryResult.data?.clientId;

    if (typeof previousUrl === 'string') {
      SessionStorage.set<string>(SESSION_STORAGE_KEYS.previousUrlForLogin, previousUrl);
    }

    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${getKakaoRedirectUrl()}&response_type=code`;
    window.location.href = link;
  };

  const goNonLoginCreateEvent = () => {
    trackStartCreateEvent({login: false});
    navigate(ROUTER_URLS.createGuestEvent);
  };

  return {goKakaoLogin, goNonLoginCreateEvent};
};

export default useLoginPage;
