import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet, requestPostWithResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

export type RequestPostNewEvent = {
  eventName: string;
  password: number;
};

export type ResponsePostNewEvent = {
  eventId: string;
};

export const requestPostNewEvent = async ({eventName, password}: RequestPostNewEvent) => {
  return await requestPostWithResponse<ResponsePostNewEvent>({
    endpoint: TEMP_PREFIX,
    body: {
      eventName: eventName,
      password: password,
    },
  });
};

type ResponseGetEventName = {
  eventName: string;
};

export const requestGetEventName = async ({eventId}: WithEventId) => {
  return requestGet<ResponseGetEventName>({
    endpoint: `${TEMP_PREFIX}/${eventId}`,
  });
};
