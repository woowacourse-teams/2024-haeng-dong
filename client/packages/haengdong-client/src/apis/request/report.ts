import type {MemberReport} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type ResponseGetMemberReportList = {
  reports: MemberReport[];
};

export const requestGetMemberReportList = async ({eventId}: WithEventId) => {
  const {reports} = await requestGet<ResponseGetMemberReportList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions/reports`,
  });

  return reports;
};
