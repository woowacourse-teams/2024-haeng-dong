import {Event, EventCreationData, EventId, EventName, User} from 'types/serviceType';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {ADMIN_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestGet, requestPatch, requestPostWithResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

export const requestPostGuestEvent = async (postEventArgs: EventCreationData) => {
  return await requestPostWithResponse<EventId>({
    endpoint: `${USER_API_PREFIX}/guest`,
    body: {
      ...postEventArgs,
    },
  });
};

export const requestPostMemberEvent = async (eventName: EventName) => {
  return await requestPostWithResponse<EventId>({
    endpoint: USER_API_PREFIX,
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

export type RequestPatchUser = Partial<User>;

export const requestPatchUser = async (args: RequestPatchUser) => {
  return requestPatch({
    endpoint: `/api/users`,
    body: {
      ...args,
    },
  });
};
