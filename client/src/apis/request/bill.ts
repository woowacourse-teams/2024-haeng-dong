import type {Bill} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestPost, requestDelete, requestPut} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type RequestPostBillList = {
  billList: Bill[];
};

export const requestPostBillList = async ({eventId, billList}: WithEventId<RequestPostBillList>) => {
  await requestPost({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/bill-actions`,
    body: {
      actions: billList,
    },
  });
};

type RequestDeleteBillAction = {
  actionId: number;
};

export const requestDeleteBillAction = async ({eventId, actionId}: WithEventId<RequestDeleteBillAction>) => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/bill-actions/${actionId}`,
  });
};

type RequestPutBillAction = Bill & {
  actionId: number;
};

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
