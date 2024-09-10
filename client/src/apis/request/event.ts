import {USER_API_PREFIX} from '@apis/enpointPrefix';
import {requestGet, requestPostWithResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

export type RequestPostNewEvent = {
  eventName: string;
  password: string;
};

export type ResponsePostNewEvent = {
  eventId: string;
};

export const requestPostNewEvent = async ({eventName, password}: RequestPostNewEvent) => {
  return await requestPostWithResponse<ResponsePostNewEvent>({
    endpoint: USER_API_PREFIX,
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
    endpoint: `${USER_API_PREFIX}/${eventId}`,
  });
};
