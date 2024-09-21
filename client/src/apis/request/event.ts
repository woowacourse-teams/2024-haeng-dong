import {Event, EventId} from 'types/serviceType';

import {ADMIN_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet, requestPatch, requestPostWithResponse, requestPut} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export interface RequestPostEvent {
  eventName: string;
  password: string;
}

export const requestPostEvent = async ({eventName, password}: RequestPostEvent) => {
  return await requestPostWithResponse<EventId>({
    endpoint: USER_API_PREFIX,
    body: {
      eventName,
      password,
    },
  });
};

export const requestGetEvent = async ({eventId}: WithEventId) => {
  return await requestGet<Event>({
    endpoint: `${USER_API_PREFIX}/${eventId}`,
  });
};

export type RequestPatchEvent = WithEventId & {
  eventOutline: Partial<Event>;
};

export const requestPatchEvent = async ({eventId, eventOutline}: RequestPatchEvent) => {
  return requestPatch({
    endpoint: `${ADMIN_API_PREFIX}/${eventId}`,
    body: {
      ...eventOutline,
    },
  });
};
