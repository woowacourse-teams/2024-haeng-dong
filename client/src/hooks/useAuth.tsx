import {RequestAuthentication, requestAuthentication, RequestToken, requestToken} from '@apis/request/auth';
import {useFetch} from '@apis/useFetch';

const useAuth = () => {
  const {fetch} = useFetch();

  const postAuthentication = async ({eventId}: RequestAuthentication) => {
    return await fetch(() => requestAuthentication({eventId}));
  };

  const postLogin = async ({eventId, password}: RequestToken) => {
    return await fetch(() => requestToken({eventId, password}));
  };

  return {postAuthentication, postLogin};
};

export default useAuth;
