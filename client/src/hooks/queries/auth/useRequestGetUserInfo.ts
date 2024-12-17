import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

import {requestGetUserInfo} from '@apis/request/auth';

import QUERY_KEYS from '@constants/queryKeys';

export type UseRequestGetUserInfo = ReturnType<typeof useRequestGetUserInfo>;

const useRequestGetUserInfo = () => {
  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: () => requestGetUserInfo(),
    // quernFn은 ErrorCatcher 구독을 하지 않으며 오류가 났을 경우 로그인 화면을 띄워야하므로 initialData를 설정했습니다.
    throwOnError: false,
    initialData: {
      isGuest: true,
      nickname: '',
      profileImage: '',
      accountNumber: '',
      bankName: '',
    },
    initialDataUpdatedAt: 0,
  });

  return {
    ...data,
    ...rest,
  };
};

export default useRequestGetUserInfo;
