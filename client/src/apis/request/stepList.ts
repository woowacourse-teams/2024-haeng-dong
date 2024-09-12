import type {StepList} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

// TODO: (@weadie) 현재 토큰을 어떻게 관리할지.. 계속 사용되는데
export const requestGetStepList = async ({eventId}: WithEventId) => {
  // TODO: (@weadie) response가 어떻게 오는지 안나와서 data로만 써뒀어요.
  const {steps} = await requestGet<StepList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/actions`,
  });

  return steps;
};
