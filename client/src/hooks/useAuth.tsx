import {RequestAuthentication, RequestToken, requestPostAuthentication, requestPostToken} from '@apis/request/auth';

import {useFetch} from '@apis/useFetch';

const useAuth = () => {
  const {fetch} = useFetch();

  const checkAuthentication = async ({eventId}: RequestAuthentication) => {
    return await fetch({queryFunction: () => requestPostAuthentication({eventId})});
  };

  const loginUser = async ({eventId, password}: RequestToken) => {
    return await fetch({queryFunction: () => requestPostToken({eventId, password})});
  };

  return {checkAuthentication, loginUser};
};

export default useAuth;
