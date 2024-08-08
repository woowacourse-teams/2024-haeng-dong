import type {MemberReport} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestPost} from '@apis/fetcher';

export type RequestAuthentication = {
  eventId: string;
};

export type RequestToken = {
  eventId: string;
  password: string;
};

export const requestAuthentication = async ({eventId}: RequestAuthentication) => {
  await requestPost({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/auth`,
  });
};

export const requestToken = async ({eventId, password}: RequestToken) => {
  return await requestPost({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/login`,
    body: {
      password: password,
    },
  });
};
