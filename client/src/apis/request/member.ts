import type {AllMembers, Members} from 'types/serviceType';

import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX, MEMBER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete, requestGet, requestPut, requestPostWithResponse} from '@apis/request';
import {WithEventId} from '@apis/withId.type';

export interface PostMember {
  name: string;
}

export interface RequestPostMembers {
  members: PostMember[];
}

export const requestPostMembers = async ({eventId, members: newMembers}: WithEventId<RequestPostMembers>) => {
  return await requestPostWithResponse<Members>({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/members`,
    body: {
      members: newMembers,
    },
  });
};

export interface RequestDeleteMember {
  memberId: number;
}

export const requestDeleteMember = async ({eventId, memberId}: WithEventId<RequestDeleteMember>) => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/members/${memberId}`,
  });
};

interface PutMember {
  id: number;
  name: string;
  isDeposited: boolean;
}

export interface RequestPutMembers {
  members: PutMember[];
}

export const requestPutMembers = async ({eventId, members}: WithEventId<RequestPutMembers>) => {
  await requestPut({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/members`,
    body: {
      members: members,
    },
  });
};

export const requestGetCurrentMembers = async ({eventId, ...props}: WithEventId<WithErrorHandlingStrategy>) => {
  return await requestGet<Members>({
    baseUrl: BASE_URL.HD,
    endpoint: `${MEMBER_API_PREFIX}/${eventId}/members/current`,
    ...props,
  });
};

export const requestGetAllMembers = async ({eventId, ...props}: WithEventId<WithErrorHandlingStrategy>) => {
  return await requestGet<AllMembers>({
    endpoint: `${MEMBER_API_PREFIX}/${eventId}/members`,
    ...props,
  });
};
