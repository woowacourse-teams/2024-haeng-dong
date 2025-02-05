import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

import {requestPostAuthentication} from '@apis/request/auth';

import useEventDataContext from '@hooks/useEventDataContext';

import {useAuthStore} from '@store/authStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import SessionStorage from '@utils/SessionStorage';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';
import {ROUTER_URLS} from '@constants/routerUrls';

const useRequestPostAuthentication = () => {
  const eventId = getEventIdByUrl();
  const navigate = useNavigate();
  const {updateAuth} = useAuthStore();

  const {createdByGuest} = useEventDataContext();

  const isSecondEncounteredOnError = () => {
    return window.location.pathname.includes('/login/guest') || window.location.pathname.includes('/login/user');
  };

  const {mutate, ...rest} = useMutation({
    mutationFn: () => requestPostAuthentication({eventId}),
    onSuccess: () => updateAuth(true),
    onError: () => {
      if (isSecondEncounteredOnError()) return;
      SessionStorage.set<string>(SESSION_STORAGE_KEYS.previousUrlForLogin, window.location.pathname);

      const eventToken = getEventIdByUrl();

      if (createdByGuest) {
        navigate(ROUTER_URLS.guestEventLogin.replace(':eventId', eventToken));
      } else {
        navigate(ROUTER_URLS.userEventLogin.replace(':eventId', eventToken));
      }
    },
  });

  return {
    postAuthenticate: mutate,
    ...rest,
  };
};

export default useRequestPostAuthentication;
