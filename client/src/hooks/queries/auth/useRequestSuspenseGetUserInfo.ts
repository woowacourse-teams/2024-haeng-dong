import {useSuspenseQuery} from '@tanstack/react-query';

import {requestGetUserInfo} from '@apis/request/auth';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestSuspenseGetUserInfo = () => {
  const {data, ...rest} = useSuspenseQuery({
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: () => requestGetUserInfo(),
  });

  const userInfo = {
    isGuest: data.isGuest,
    nickname: data.nickname,
    profileImage: data.profileImage,
    accountNumber: data.accountNumber,
    bankName: data.bankName,
  };

  return {
    userInfo,
    ...rest,
  };
};

export default useRequestSuspenseGetUserInfo;
