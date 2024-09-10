import {ADMIN_API_PREFIX} from './../enpointPrefix';
import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/enpointPrefix';
import {requestPostWithoutResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

export type RequestToken = {
  password: string;
};

export const requestPostAuthentication = async ({eventId}: WithEventId) => {
  await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/auth`,
  });
};

export const requestPostToken = async ({eventId, password}: WithEventId<RequestToken>) => {
  await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/login`,
    body: {
      password: password,
    },
  });
};
