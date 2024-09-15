import type {MemberReport} from 'types/serviceType';

import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type ResponseGetMemberReportList = {
  reports: MemberReport[];
};

export const requestGetMemberReportList = async ({eventId, ...props}: WithEventId<WithErrorHandlingStrategy>) => {
  const {reports} = await requestGet<ResponseGetMemberReportList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions/reports`,
    ...props,
  });

  return reports;
};
