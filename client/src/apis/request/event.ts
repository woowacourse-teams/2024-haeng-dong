import {Event, EventId} from 'types/serviceType';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';
import {CreateEventArgs, EventName} from 'types/createEvent';

import {ADMIN_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet, requestPatch, requestPostWithResponse, requestPut} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export const requestPostGuestEvent = async (postEventArgs: CreateEventArgs) => {
  return await requestPostWithResponse<EventId>({
    endpoint: `${USER_API_PREFIX}/guest`,
    body: {
      ...postEventArgs,
    },
  });
};

export const requestPostMemberEvent = async (eventName: EventName) => {
  return await requestPostWithResponse<EventId>({
    endpoint: `${USER_API_PREFIX}/events`,
    body: {
      eventName,
    },
  });
};

export const requestGetEvent = async ({eventId, ...props}: WithEventId<WithErrorHandlingStrategy>) => {
  return await requestGet<Event>({
    endpoint: `${USER_API_PREFIX}/${eventId}`,
    ...props,
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
