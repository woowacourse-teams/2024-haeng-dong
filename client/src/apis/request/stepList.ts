import type {StepList} from 'types/serviceType';

import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

export const requestGetStepList = async ({eventId, ...props}: WithEventId<WithErrorHandlingStrategy>) => {
  const {steps} = await requestGet<StepList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions`,
    ...props,
  });

  return steps;
};
