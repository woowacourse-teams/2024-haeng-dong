import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestPostWithoutResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

export type RequestToken = {
  password: string;
};

export const requestPostAuthentication = async ({eventId}: WithEventId) => {
  await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/auth`,
  });
};

export const requestPostToken = async ({eventId, password}: WithEventId<RequestToken>) => {
  await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/login`,
    body: {
      password: password,
    },
  });
};
