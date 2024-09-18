import type {StepList} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export const requestGetStepList = async ({eventId}: WithEventId) => {
  const {steps} = await requestGet<StepList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/bills`,
  });

  return steps;
};
