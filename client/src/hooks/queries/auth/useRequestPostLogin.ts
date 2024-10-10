import {useMutation} from '@tanstack/react-query';

import {RequestPostToken, requestPostToken} from '@apis/request/auth';

import {useAuthStore} from '@store/authStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

const useRequestPostLogin = () => {
  const eventId = getEventIdByUrl();
  const {updateAuth} = useAuthStore();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({password}: RequestPostToken) => requestPostToken({eventId, password}),
    onSuccess: () => updateAuth(true),
  });

  return {postLogin: mutate, ...rest};
};

export default useRequestPostLogin;
