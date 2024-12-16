import {useQuery} from '@tanstack/react-query';

import {requestGetUserInfo} from '@apis/request/auth';

import QUERY_KEYS from '@constants/queryKeys';

export type UseRequestGetUserInfo = ReturnType<typeof useRequestGetUserInfo>;

const useRequestGetUserInfo = () => {
  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: () => requestGetUserInfo(),
  });

  return {
    ...data,
    ...rest,
  };
};

export default useRequestGetUserInfo;
