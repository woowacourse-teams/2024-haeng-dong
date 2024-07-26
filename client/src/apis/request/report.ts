import {MemberReport} from 'types/stepList';

import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type ResponseMemberReportList = {
  reports: MemberReport[];
};

export const requestMemberReportList = async ({eventId}: WithEventId) => {
  const {reports} = await requestGet<ResponseMemberReportList>({
    baseUrl: BASE_URL.HD,
    endpoint: `${TEMP_PREFIX}/${eventId}/actions/reports`,
  });

  return reports;
};
