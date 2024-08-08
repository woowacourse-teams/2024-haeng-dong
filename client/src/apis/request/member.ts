import type {MemberType} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestPost, requestDelete, requestGet, requestPut} from '@apis/fetcher';
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
  });
};

export type MemberChange = {
  before: string;
  after: string;
};

type RequestPutAllMemberList = {
  members: MemberChange[];
};

export const requestPutAllMemberList = async ({eventId, members}: WithEventId<RequestPutAllMemberList>) => {
  await requestPut({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/members/nameChange`,
    body: {
      members,
    },
  });
};

type RequestDeleteAllMemberList = {
  memberName: string;
};

export const requestDeleteAllMemberList = async ({eventId, memberName}: WithEventId<RequestDeleteAllMemberList>) => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/members/${memberName}`,
  });
};
