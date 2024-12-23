import {User, UserInfo} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete, requestPatchWithoutResponse} from '@apis/request';
import {requestGet} from '@apis/request';

export const requestDeleteUser = async () => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: USER_API_PREFIX,
  });
};

export const requestGetUserInfo = async () => {
  return await requestGet<UserInfo>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/mine`,
    errorHandlingStrategy: 'unsubscribe',
  });
};

export type RequestPatchUser = Partial<User>;

export const requestPatchUser = async (args: RequestPatchUser) => {
  await requestPatchWithoutResponse({
    endpoint: USER_API_PREFIX,
    body: {
      ...args,
    },
  });
};
