import {useSuspenseQuery} from '@tanstack/react-query';

import {requestGetUserInfo} from '@apis/request/user';
import {UserInfo} from 'types/serviceType';

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

  const {data, ...rest} = useSuspenseQuery({
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: () => requestGetUserInfo(),
    // quernFn은 ErrorCatcher 구독을 하지 않으며 오류가 났을 경우 로그인 화면을 띄워야하므로 initialData를 설정했습니다.
    initialData: enableInitialData ? initialData : undefined,
    initialDataUpdatedAt: enableInitialData ? 0 : undefined,
  });

  return {
    userInfo: {...data},
    ...rest,
  };
};

export default useRequestGetUserInfo;
