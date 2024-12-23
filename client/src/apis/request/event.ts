import {CreatedEvents, Event, EventCreationData, EventName, User} from 'types/serviceType';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {ADMIN_API_PREFIX, MEMBER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet, requestPatch, requestPostWithResponse} from '@apis/request';
import {WithEventId} from '@apis/withId.type';

export const requestPostGuestEvent = async (postEventArgs: EventCreationData) => {
  return await requestPostWithResponse<WithEventId>({
    endpoint: `${MEMBER_API_PREFIX}/guest`,
    body: {
      ...postEventArgs,
    },
  });
};

export const requestPostUserEvent = async (eventName: EventName) => {
  return await requestPostWithResponse<WithEventId>({
    endpoint: MEMBER_API_PREFIX,
    body: {
      eventName,
    },
  });
};

export const requestGetEvent = async ({eventId, ...props}: WithEventId<WithErrorHandlingStrategy>) => {
  return await requestGet<Event>({
    endpoint: `${MEMBER_API_PREFIX}/${eventId}`,
    ...props,
  });
};

export type RequestPatchEvent = WithEventId & {
  eventName: string;
};

export const requestPatchEventName = async ({eventId, eventName}: RequestPatchEvent) => {
  return requestPatch({
    endpoint: `${ADMIN_API_PREFIX}/${eventId}`,
    body: {
      eventName,
    },
  });
};

export const requestGetCreatedEvents = async () => {
  return await requestGet<CreatedEvents>({
    endpoint: `${MEMBER_API_PREFIX}/mine`,
  });
};
