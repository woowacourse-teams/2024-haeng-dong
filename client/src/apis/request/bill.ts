import type {Bill, MemberReport} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestDelete, requestGet, requestPostWithoutResponse, requestPut} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type RequestPostBillList = {
  billList: Bill[];
};

export const requestPostBillList = async ({eventId, billList}: WithEventId<RequestPostBillList>) => {
  await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/bill-actions`,
    body: {
      actions: billList,
    },
  });
};

type RequestBillAction = {
  actionId: number;
};

export const requestDeleteBillAction = async ({eventId, actionId}: WithEventId<RequestBillAction>) => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/bill-actions/${actionId}`,
  });
};

type RequestPutBillAction = Bill & RequestBillAction;

export const requestPutBillAction = async ({eventId, actionId, title, price}: WithEventId<RequestPutBillAction>) => {
  await requestPut({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/bill-actions/${actionId}`,
    body: {
      title,
      price,
    },
  });
};

type MemberReportList = {members: MemberReport[]};

export const requestGetMemberReportListInAction = async ({eventId, actionId}: WithEventId<RequestBillAction>) => {
  return requestGet<MemberReportList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/bill-actions/${actionId}/fixed`,
  });
};

type RequestPutMemberReportList = RequestBillAction & MemberReportList;

export const requestPutMemberReportListInAction = async ({
  eventId,
  actionId,
  members,
}: WithEventId<RequestPutMemberReportList>) => {
  return requestPut({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/bill-actions/${actionId}/fixed`,
    body: {
      members,
    },
  });
};
