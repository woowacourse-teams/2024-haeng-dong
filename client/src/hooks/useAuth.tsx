import {RequestToken, requestPostAuthentication, requestPostToken} from '@apis/request/auth';

import {useFetch} from '@hooks/useFetch';
import useEventId from '@hooks/useEventId/useEventId';

// 이 훅의 핵심 기능: 권한을 확인한다.
const useAuth = () => {
  const {fetch} = useFetch();
  const {eventId} = useEventId();

  const checkAuthentication = async () => {
    return await fetch({queryFunction: () => requestPostAuthentication({eventId})});
  };

  const loginUser = async ({password}: RequestToken) => {
    return await fetch({queryFunction: () => requestPostToken({eventId, password})});
  };

  return {checkAuthentication, loginUser};
};

export default useAuth;
