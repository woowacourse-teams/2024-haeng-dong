import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

import {RequestPostToken, requestPostToken} from '@apis/request/auth';

import {useAuthStore} from '@store/authStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import SessionStorage from '@utils/SessionStorage';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

const useRequestPostLogin = () => {
  const eventId = getEventIdByUrl();
  const {updateAuth} = useAuthStore();
  const navigate = useNavigate();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({password}: RequestPostToken) => requestPostToken({eventId, password}),
    onSuccess: () => {
      const previousUrlForLogin = SessionStorage.get<string>(SESSION_STORAGE_KEYS.previousUrlForLogin);
      if (previousUrlForLogin) {
        SessionStorage.remove(SESSION_STORAGE_KEYS.previousUrlForLogin);
        navigate(previousUrlForLogin, {replace: true});
      }
      updateAuth(true);
    },
  });

  return {postLogin: mutate, ...rest};
};

export default useRequestPostLogin;
