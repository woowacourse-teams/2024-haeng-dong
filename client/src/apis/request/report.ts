import type {MemberReport} from 'types/serviceType';

import {BASE_URL} from '@apis/baseUrl';
import {USER_API_PREFIX} from '@apis/enpointPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type ResponseGetMemberReportList = {
  reports: MemberReport[];
};

export const requestGetMemberReportList = async ({eventId}: WithEventId) => {
  const {reports} = await requestGet<ResponseGetMemberReportList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${USER_API_PREFIX}/${eventId}/actions/reports`,
  });

  return reports;
};
