import {http, HttpResponse} from 'msw';

import {MemberReport} from 'types/serviceType';

import {USER_API_PREFIX} from '@apis/endpointPrefix';

import memberReportInActionJson from '../memberReportListInAction.json';
import {MOCK_API_PREFIX} from '@mocks/mockEndpointPrefix';

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
    `${typeof MOCK_API_PREFIX}${typeof USER_API_PREFIX}/:eventId/bill-actions/:actionId/fixed`
  >(`${MOCK_API_PREFIX}${USER_API_PREFIX}/:eventId/bill-actions/:actionId/fixed`, ({params}) => {
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

  http.put<
    any,
    MemberReportListBody,
    any,
    `${typeof MOCK_API_PREFIX}${typeof USER_API_PREFIX}/:eventId/bill-actions/:actionId/fixed`
  >(`${MOCK_API_PREFIX}${USER_API_PREFIX}/:eventId/bill-actions/:actionId/fixed`, async ({request}) => {
    const {members} = await request.json();

    memberReportInActionMockData = members;

    return HttpResponse.json({
      status: 200,
    });
  }),
];
