import {Event, EventId, EventOutline} from 'types/serviceType';

import {USER_API_PREFIX} from '@apis/endpointPrefix';
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

export interface RequestPutEvent {
  eventName?: string;
  bankName?: string;
  accountNumber?: string;
}

export const requestPutEvent = async ({eventId, eventName, bankName, accountNumber}: WithEventId<RequestPutEvent>) => {
  return await requestPut({
    endpoint: `${USER_API_PREFIX}/${eventId}`,
    body: {
      eventName,
      bankName,
      accountNumber,
    },
  });
};

export type RequestPatchEventOutline = WithEventId & {
  eventOutline: Partial<EventOutline>;
};

export const requestPatchEventOutline = async ({eventId, eventOutline}: RequestPatchEventOutline) => {
  return requestPatch({
    endpoint: `${USER_API_PREFIX}/${eventId}`,
    body: {
      ...eventOutline,
    },
  });
};
