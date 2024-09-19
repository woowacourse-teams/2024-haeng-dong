import {EventOutline} from 'types/serviceType';

import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet, requestPatch, requestPostWithResponse} from '@apis/fetcher';
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
    endpoint: TEMP_PREFIX,
    body: {
      eventName: eventName,
      password: password,
    },
  });
};

export const requestGetEventOutline = async ({eventId}: WithEventId) => {
  return requestGet<EventOutline>({
    endpoint: `${TEMP_PREFIX}/${eventId}`,
  });
};

export type RequestPatchEventOutline = WithEventId & {
  eventOutline: Partial<EventOutline>;
};

export const requestPatchEventOutline = async ({eventId, eventOutline}: RequestPatchEventOutline) => {
  return requestPatch({
    endpoint: `${TEMP_PREFIX}/${eventId}`,
    body: {
      ...eventOutline,
    },
  });
};
