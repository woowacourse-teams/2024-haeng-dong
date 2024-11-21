import {useMutation} from '@tanstack/react-query';

import {requestPostAuthentication} from '@apis/request/auth';

import {useAuthStore} from '@store/authStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import SessionStorage from '@utils/SessionStorage';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

import useRequestGetEvent from '../event/useRequestGetEvent';

const useRequestPostAuthentication = () => {
  const eventId = getEventIdByUrl();
  const {updateAuth} = useAuthStore();

  const {createdByGuest} = useRequestGetEvent();

  const {mutate, ...rest} = useMutation({
    mutationFn: () => requestPostAuthentication({eventId}),
    onSuccess: () => updateAuth(true),
    onMutate: () => {
      SessionStorage.set<boolean>(SESSION_STORAGE_KEYS.createdByGuest, createdByGuest);
    },
  });

  return {
    postAuthenticate: mutate,
    ...rest,
  };
};

export default useRequestPostAuthentication;
