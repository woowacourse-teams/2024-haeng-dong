import {useQuery} from '@tanstack/react-query';

import {requestKakaoClientId} from '@apis/request/auth';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetKakaoClientId = () => {
  const {refetch, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.kakaoClientId],
    queryFn: requestKakaoClientId,
    enabled: false,
  });

  return {
    requestGetClientId: refetch,
    ...rest,
  };
};

export default useRequestGetKakaoClientId;
