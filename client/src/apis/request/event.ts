import {BankAccount, CreatedEvents, Event, EventCreationData, EventId, EventName, User} from 'types/serviceType';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {ADMIN_API_PREFIX, MEMBER_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
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

export const requestPostUserEvent = async (eventName: EventName) => {
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

export type PartialEvent = Partial<
  BankAccount & {
    eventName: EventName;
  }
>;

export type RequestPatchEvent = WithEventId & PartialEvent;

export const requestPatchEvent = async ({eventId, ...event}: RequestPatchEvent) => {
  return requestPatch({
    endpoint: `${ADMIN_API_PREFIX}/${eventId}`,
    body: {
      event,
    },
  });
};

export type RequestPatchUser = Partial<User>;

// TODO: (@soha) 해당 요청은 user.ts 파일로 이동하는 건 어떨지?
export const requestPatchUser = async (args: RequestPatchUser) => {
  return requestPatch({
    endpoint: MEMBER_API_PREFIX,
    body: {
      ...args,
    },
  });
};

export const requestGetCreatedEvents = async () => {
  return await requestGet<CreatedEvents>({
    endpoint: `${USER_API_PREFIX}/mine`,
  });
};
