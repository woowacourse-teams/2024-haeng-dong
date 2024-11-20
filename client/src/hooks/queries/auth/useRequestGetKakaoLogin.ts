import {useQuery} from '@tanstack/react-query';

import {requestGetKakaoLogin} from '@apis/request/auth';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetKakaoLogin = () => {
  const code = new URLSearchParams(location.search).get('code');

  const {refetch, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.kakaoLogin, code],
    queryFn: () => requestGetKakaoLogin(code ?? ''),
    enabled: false,
  });

  return {
    requestGetKakaoLogin: refetch,
    ...rest,
  };
};

export default useRequestGetKakaoLogin;
