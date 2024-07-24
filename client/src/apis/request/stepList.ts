import {Bill, Member, StepList} from 'types/stepList';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet, requestPost} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

// TODO: (@weadie) 현재 토큰을 어떻게 관리할지.. 계속 사용되는데
export const requestStepList = async ({eventId}: WithEventId) => {
  // TODO: (@weadie) response가 어떻게 오는지 안나와서 data로만 써뒀어요.
  return await requestGet<StepList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions`,
  });
};
