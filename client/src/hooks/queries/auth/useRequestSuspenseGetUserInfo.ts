import {useSuspenseQuery} from '@tanstack/react-query';

import {requestGetUserInfo} from '@apis/request/auth';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestSuspenseGetUserInfo = () => {
  const {data, ...rest} = useSuspenseQuery({
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: () => requestGetUserInfo(),
  });

  return {
    userInfo: {...data},
    ...rest,
  };
};

export default useRequestSuspenseGetUserInfo;
