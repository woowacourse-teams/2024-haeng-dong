import {useSuspenseQuery} from '@tanstack/react-query';

import {requestGetUserInfo} from '@apis/request/user';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetUserInfo = () => {
  const {data} = useSuspenseQuery({
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: requestGetUserInfo,
  });

  return {userInfo: data};
};

export default useRequestGetUserInfo;
