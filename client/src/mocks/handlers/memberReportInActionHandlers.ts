import {http, HttpResponse} from 'msw';

import {MemberReport} from 'types/serviceType';

import {TEMP_PREFIX} from '@apis/tempPrefix';

import memberReportInActionJson from '../memberReportListInAction.json';

let memberReportInActionMockData = memberReportInActionJson as MemberReport[];

type MemberReportListBody = {members: MemberReport[]};

export const memberReportInActionHandler = [
  http.get<any, MemberReportListBody, any, `${typeof TEMP_PREFIX}/:eventId/bill-actions/:actionId/fixed`>(
    `${TEMP_PREFIX}/:eventId/bill-actions/:actionId/fixed`,
    () => {
      return HttpResponse.json({
        members: memberReportInActionMockData,
      });
    },
  ),

  http.put<any, MemberReportListBody, any, `${typeof TEMP_PREFIX}/:eventId/bill-actions/:actionId/fixed`>(
    `${TEMP_PREFIX}/:eventId/bill-actions/:actionId/fixed`,
    async ({request}) => {
      const {members} = await request.json();

      memberReportInActionMockData = members;

      return HttpResponse.json({
        status: 200,
      });
    },
  ),
];
