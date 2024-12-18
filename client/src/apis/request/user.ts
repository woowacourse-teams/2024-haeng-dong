import {User} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {MEMBER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete} from '@apis/fetcher';
import {requestGet} from '@apis/fetcher';

export const requestDeleteUser = async () => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${MEMBER_API_PREFIX}`,
  });
};

export const requestGetUserInfo = async () => {
  return await requestGet<User>({
    baseUrl: BASE_URL.HD,
    endpoint: `/api/users/mine`,
  });
};
