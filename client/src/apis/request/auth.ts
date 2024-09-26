import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestPostWithoutResponse} from '@apis/fetcher';
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
