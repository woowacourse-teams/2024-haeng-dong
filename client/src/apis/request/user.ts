import {User} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {requestGet} from '@apis/fetcher';

export const requestGetUserInfo = async () => {
  return await requestGet<User>({
    baseUrl: BASE_URL.HD,
    endpoint: `/api/users/mine`,
  });
};
