import {useMutation} from '@tanstack/react-query';

import {requestPostAuthentication} from '@apis/request/auth';

import {useAuthStore} from '@store/authStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

const useRequestPostAuthentication = () => {
  const eventId = getEventIdByUrl();
  const {updateAuth} = useAuthStore();

  const {mutate, ...rest} = useMutation({
    mutationFn: () => requestPostAuthentication({eventId}),
    onSuccess: () => updateAuth(true),
  });

  return {
    postAuthenticate: mutate,
    ...rest,
  };
};

export default useRequestPostAuthentication;
