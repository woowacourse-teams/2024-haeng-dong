import type {BillDetails} from 'types/serviceType';

import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {BASE_URL} from '@apis/baseUrl';
import {ADMIN_API_PREFIX, USER_API_PREFIX} from '@apis/endpointPrefix';
import {requestDelete, requestGet, requestPostWithoutResponse, requestPut} from '@apis/fetcher';
import {WithBillId, WithEventId} from '@apis/withId.type';

export interface RequestPostBill {
  title: string;
  price: number;
  members: number[];
}

export const requestPostBill = async ({eventId, title, price, members}: WithEventId<RequestPostBill>) => {
  await requestPostWithoutResponse({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/bills`,
    body: {
      title,
      price,
      members,
    },
  });
};

export const requestDeleteBill = async ({eventId, billId}: WithEventId<WithBillId>) => {
  await requestDelete({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/bills/${billId}`,
  });
};

export interface RequestPutBill {
  title: string;
  price: number;
}

export const requestPutBill = async ({eventId, billId, title, price}: WithEventId<WithBillId<RequestPutBill>>) => {
  await requestPut({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/bills/${billId}`,
    body: {title, price},
  });
};

export const requestGetBillDetails = async ({
  eventId,
  billId,
  ...props
}: WithEventId<WithErrorHandlingStrategy<WithBillId>>) => {
  return requestGet<BillDetails>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/bills/${billId}/fixed`,
    ...props,
  });
};

interface PutBillDetail {
  id: number;
  price: number;
  isFixed: boolean;
}

export interface RequestPutBillDetails {
  billDetails: PutBillDetail[];
}

export const requestPutBillDetails = async ({
  eventId,
  billId,
  billDetails,
}: WithEventId<WithBillId<RequestPutBillDetails>>) => {
  await requestPut({
    baseUrl: BASE_URL.HD,
    endpoint: `${ADMIN_API_PREFIX}/${eventId}/bills/${billId}/fixed`,
    body: {billDetails},
  });
};
