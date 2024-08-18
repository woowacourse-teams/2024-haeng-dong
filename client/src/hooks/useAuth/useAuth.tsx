import {RequestToken, requestPostAuthentication, requestPostToken} from '@apis/request/auth';
import {useFetch} from '@hooks/useFetch/useFetch';

import getEventIdByUrl from '@utils/getEventIdByUrl';

const useAuth = () => {
  const {fetch} = useFetch();
  const eventId = getEventIdByUrl();

  const checkAuthentication = async () => {
    return await fetch({queryFunction: () => requestPostAuthentication({eventId})});
  };

  const loginUser = async ({password}: RequestToken) => {
    return await fetch({queryFunction: () => requestPostToken({eventId, password})});
  };

  return {checkAuthentication, loginUser};
};

export default useAuth;
