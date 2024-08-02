import type {Bill} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestPost} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type RequestAddBillList = {
  billList: Bill[];
};

export const requestAddBillList = async ({eventId, billList}: WithEventId<RequestAddBillList>) => {
  await requestPost({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions/bills`,
    body: {
      actions: billList,
    },
  });
};
