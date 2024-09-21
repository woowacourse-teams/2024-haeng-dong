import type {Reports} from 'types/serviceType';

import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export const requestGetReports = async ({eventId, ...props}: WithEventId<WithErrorHandlingStrategy>) => {
  return await requestGet<Reports>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/reports`,
    ...props,
  });
};
