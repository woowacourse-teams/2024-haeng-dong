import type {AllMembers, Members} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete, requestGet, requestPut, requestPostWithResponse} from '@apis/fetcher';
import {WithEventId} from '@apis/withId.type';

interface PostMember {
  name: string;
}

export interface RequestPostMember {
  members: PostMember[];
}

export const requestPostMember = async ({eventId, members: newMembers}: WithEventId<RequestPostMember>) => {
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

export interface RequestPutMember {
  members: PutMember[];
}

export const requestPutMember = async ({eventId, members}: WithEventId<RequestPutMember>) => {
  await requestPut({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/members`,
    body: {
      members: members,
    },
  });
};

export const requestGetCurrentMember = async ({eventId}: WithEventId) => {
  return await requestGet<Members>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/members/current`,
  });
};

export const requestGetAllMember = async ({eventId}: WithEventId) => {
  return await requestGet<AllMembers>({
    endpoint: `${USER_API_PREFIX}/${eventId}/members`,
  });
};
