import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

import {requestPostAuthentication} from '@apis/request/auth';

import {useAuthStore} from '@store/authStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import SessionStorage from '@utils/SessionStorage';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

import useRequestGetEvent from '../event/useRequestGetEvent';

const useRequestPostAuthentication = () => {
  const eventId = getEventIdByUrl();
  const navigate = useNavigate();
  const {updateAuth} = useAuthStore();

  const {createdByGuest} = useRequestGetEvent();

  const {mutate, ...rest} = useMutation({
    mutationFn: () => requestPostAuthentication({eventId}),
    onSuccess: () => updateAuth(true),
    onError: () => {
      if (!window.location.pathname.includes('/guest/login') && !window.location.pathname.includes('/member/login')) {
        SessionStorage.set<string>(SESSION_STORAGE_KEYS.previousUrlForLogin, window.location.pathname);

        const currentPath = window.location.pathname;

        if (createdByGuest) {
          navigate(`${currentPath}/guest/login`);
        } else {
          navigate(`${currentPath}/member/login`);
        }
      }
    },
  });

  return {
    postAuthenticate: mutate,
    ...rest,
  };
};

export default useRequestPostAuthentication;
