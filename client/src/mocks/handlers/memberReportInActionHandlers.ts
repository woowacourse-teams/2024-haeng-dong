import {http, HttpResponse} from 'msw';

import {MemberReport} from 'types/serviceType';

import {MSW_TEMP_PRIFIX} from '@mocks/serverConstants';

import memberReportInActionJson from '../memberReportListInAction.json';

let memberReportInActionMockData = memberReportInActionJson as MemberReport[];

type MemberReportListRequestParams = {
  eventId: string;
  actionId: string;
};
type MemberReportListBody = {members: MemberReport[]};

export const memberReportInActionHandler = [
  http.get<
    MemberReportListRequestParams,
    MemberReportListBody,
    any,
    `${typeof MSW_TEMP_PRIFIX}/:eventId/bill-actions/:actionId/fixed`
  >(`${MSW_TEMP_PRIFIX}/:eventId/bill-actions/:actionId/fixed`, ({params}) => {
    const {actionId} = params;

    if (Number(actionId) === 123) {
      return HttpResponse.json({
        members: memberReportInActionMockData,
      });
    }

    return HttpResponse.json({
      members: memberReportInActionMockData.slice(0, 2),
    });
  }),

  http.put<any, MemberReportListBody, any, `${typeof MSW_TEMP_PRIFIX}/:eventId/bill-actions/:actionId/fixed`>(
    `${MSW_TEMP_PRIFIX}/:eventId/bill-actions/:actionId/fixed`,
    async ({request}) => {
      const {members} = await request.json();

      memberReportInActionMockData = members;

      return HttpResponse.json({
        status: 200,
      });
    },
  ),
];
