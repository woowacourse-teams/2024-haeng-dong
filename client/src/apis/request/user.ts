import {User} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete} from '@apis/fetcher';
import {requestGet} from '@apis/fetcher';

export const requestDeleteUser = async () => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}`,
  });
};

export const requestGetUserInfo = async () => {
  return await requestGet<User>({
    baseUrl: BASE_URL.HD,
    endpoint: `/api/users/mine`,
  });
};
