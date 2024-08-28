import {HttpResponse, http} from 'msw';

import {Bill, MemberType, StepList} from 'types/serviceType';

import {TEMP_PREFIX} from '@apis/tempPrefix';

import stepListJson from '../stepList.json';

type StepListResponseBody = {
  step: StepList;
};

type PostMemberListRequestBody = {
  members: string[];
  status: MemberType;
};

type PostBillListRequestBody = {
  actions: Bill[];
};

let stepListMockData = stepListJson;

export const stepListHandler = [
  http.get<any, StepListResponseBody, any, `${typeof TEMP_PREFIX}/:eventId/actions`>(
    `${TEMP_PREFIX}/:eventId/actions`,
    () => {
      return HttpResponse.json({
        steps: stepListMockData,
      });
    },
  ),

  http.get(`${TEMP_PREFIX}/:eventId/members`, () => {
    return HttpResponse.json({
      memberNames: stepListMockData
        .filter(({type}) => type !== 'BILL')
        .map(({actions}) => actions.map(({name}) => name))
        .flat(),
    });
  }),

  http.delete<{actionId: string}>(`${TEMP_PREFIX}/:eventId/member-actions/:actionId`, ({params}) => {
    const {actionId} = params;

    if (parseInt(actionId) === 999) {
      return HttpResponse.json(
        {
          errorCode: 'MEMBER_ACTION_STATUS_INVALID',
          message: 'actionId는 999일 수 없습니다.(고의로 만든 에러임)',
        },
        {status: 401},
      );
    } else {
      return HttpResponse.json({
        status: 200,
      });
    }
  }),

  http.post<any, PostMemberListRequestBody, any, `${typeof TEMP_PREFIX}/:eventId/member-actions`>(
    `${TEMP_PREFIX}/:eventId/member-actions`,
    async ({request}) => {
      const {members, status} = await request.json();
      stepListMockData = [
        ...stepListJson,
        {
          type: status,
          stepName: '영차영차',
          members: status === 'IN' ? members : [],
          actions: members.map(name => ({
            actionId: 999,
            name,
            price: 0,
            sequence: 999,
            isFixed: false,
          })),
        },
      ];

      return HttpResponse.json({
        status: 200,
      });
    },
  ),

  http.post<any, PostBillListRequestBody, any, `${typeof TEMP_PREFIX}/:eventId/bill-actions`>(
    `${TEMP_PREFIX}/:eventId/bill-actions`,
    async ({request}) => {
      const {actions} = await request.json();

      stepListMockData = [
        ...stepListJson,
        {
          type: 'BILL',
          stepName: '밥스카이',
          members: [],
          actions: actions.map(({title, price}) => ({
            actionId: 999,
            name: title,
            price,
            sequence: 999,
            isFixed: false,
          })),
        },
      ];

      return HttpResponse.json({
        status: 200,
      });
    },
  ),
];
