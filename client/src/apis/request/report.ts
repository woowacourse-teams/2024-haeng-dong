import type {Reports} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export const requestGetMemberReport = async ({eventId}: WithEventId) => {
  return await requestGet<Reports>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/reports`,
  });
};
