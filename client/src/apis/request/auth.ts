import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet, requestGetWithoutResponse, requestPostWithoutResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

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
    endpoint: `${USER_API_PREFIX}/${eventId}/login`,
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
  const redirectUri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000' + process.env.KAKAO_REDIRECT_URI
      : 'https://haengdong.pro' + process.env.KAKAO_REDIRECT_URI;

  await requestGetWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `/api/login/kakao?code=${code}&redirect_uri=${redirectUri}`,
  });
};
