import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestDelete} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type RequestDeleteAction = {
  actionId: number;
};

export const requestDeleteAction = async ({eventId, actionId}: WithEventId<RequestDeleteAction>) => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions/${actionId}`,
  });
};
