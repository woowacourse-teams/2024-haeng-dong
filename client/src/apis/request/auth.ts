import {UserInfo} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX, USER_API_PREFIX, MEMBER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet, requestGetWithoutResponse, requestPostWithoutResponse} from '@apis/request';
import {WithEventId} from '@apis/withId.type';

import getKakaoRedirectUrl from '@utils/getKakaoRedirectUrl';

export const requestPostAuthentication = async ({eventId}: WithEventId) => {
  await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/auth`,
  });
};

export interface RequestPostToken {
  password: string;
}

export const requestPostToken = async ({eventId, password}: WithEventId<RequestPostToken>) => {
  await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${MEMBER_API_PREFIX}/${eventId}/login`,
    body: {
      password: password,
    },
  });
};

export const requestKakaoClientId = async () => {
  return await requestGet<{clientId: string}>({
    baseUrl: BASE_URL.HD,
    endpoint: '/api/kakao-client-id',
  });
};

export const requestGetKakaoLogin = async (code: string) => {
  await requestGetWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `/api/login/kakao?code=${code}&redirect_uri=${getKakaoRedirectUrl()}`,
    errorHandlingStrategy: 'errorBoundary',
  });

  return null;
};

export const requestGetUserInfo = async () => {
  return await requestGet<UserInfo>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/mine`,
    errorHandlingStrategy: 'unsubscribe',
  });
};
