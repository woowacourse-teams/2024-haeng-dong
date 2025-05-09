import {useSuspenseQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

import {requestGetUserInfo} from '@apis/request/user';
import {UserInfo} from 'types/serviceType';

import {useAuthStore} from '@store/authStore';

import QUERY_KEYS from '@constants/queryKeys';

export type UseRequestGetUserInfo = ReturnType<typeof useRequestGetUserInfo>;

type UseRequestGetUserInfoArgs = {
  enableInitialData?: boolean;
};

const useRequestGetUserInfo = ({enableInitialData = true}: UseRequestGetUserInfoArgs = {}) => {
  const initialData: UserInfo = {
    isGuest: true,
    nickname: '',
    profileImage: '',
    accountNumber: '',
    bankName: '',
  };

  const {data, isSuccess, isError, ...rest} = useSuspenseQuery({
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: () => requestGetUserInfo({errorHandlingStrategy: enableInitialData ? 'ignore' : 'errorBoundary'}),
    // quernFn은 ErrorCatcher 구독을 하지 않으며 오류가 났을 경우 로그인 화면을 띄워야하므로 initialData를 설정했습니다.
    initialData: enableInitialData ? initialData : undefined,
    initialDataUpdatedAt: enableInitialData ? 0 : undefined,
  });

  const {updateKakaoAuth} = useAuthStore();

  useEffect(() => {
    if (isSuccess) {
      updateKakaoAuth(!data.isGuest);
    } else if (isError) {
      updateKakaoAuth(false);
    }
  }, [isSuccess, isError]);

  return {
    userInfo: {...data},
    isSuccess,
    ...rest,
  };
};

export default useRequestGetUserInfo;
