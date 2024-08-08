import type {MemberType} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestPost, requestDelete, requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type RequestPostMemberList = {
  memberNameList: string[];
  type: MemberType;
};

export const requestPostMemberList = async ({eventId, type, memberNameList}: WithEventId<RequestPostMemberList>) => {
  await requestPost({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/member-actions`,
    body: {
      members: memberNameList,
      status: type,
    },
  });
};

type RequestDeleteMemberAction = {
  actionId: number;
};

export const requestDeleteMemberAction = async ({eventId, actionId}: WithEventId<RequestDeleteMemberAction>) => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/member-actions/${actionId}`,
  });
};

type ResponseGetAllMemberList = {
  memberNames: string[];
};

export const requestGetAllMemberList = async ({eventId}: WithEventId) => {
  return requestGet<ResponseGetAllMemberList>({
    endpoint: `${TEMP_PREFIX}/${eventId}/members`,

export type ResponseGetCurrentInMemberList = {
  members: Array<{name: string}>;
};

export const requestGetCurrentInMemberList = async (eventId: string) => {
  return await requestGet<ResponseGetCurrentInMemberList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/members/current`,
  });
};
