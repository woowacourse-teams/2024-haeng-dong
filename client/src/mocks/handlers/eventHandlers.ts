import type {EventId} from 'types/serviceType';

import {http, HttpResponse} from 'msw';

import {ADMIN_API_PREFIX, MEMBER_API_PREFIX} from '@apis/endpointPrefix';

import RULE from '@constants/rule';

import {VALID_EVENT_NAME_LENGTH_IN_SERVER} from '@mocks/serverConstants';
import {MOCK_API_PREFIX} from '@mocks/mockEndpointPrefix';
import {eventData} from '@mocks/sharedState';

export const eventHandler = [
  // POST /api/events (requestPostEvent)
  http.post<any, {eventName: string; password: string}>(`${MOCK_API_PREFIX}${MEMBER_API_PREFIX}`, async ({request}) => {
    const {eventName, password} = await request.json();

    if (
      eventName.length < VALID_EVENT_NAME_LENGTH_IN_SERVER.min ||
      eventName.length > VALID_EVENT_NAME_LENGTH_IN_SERVER.max
    ) {
      return HttpResponse.json(
        {
          errorCode: 'EVENT_NAME_LENGTH_INVALID',
          message: `행사 이름은 2자 이상 ${RULE.maxEventNameLength}자 이하만 입력 가능합니다.`,
        },
        {status: 400},
      );
    }

    if (password.length !== 4) {
      return HttpResponse.json(
        {
          errorCode: 'EVENT_PASSWORD_FORMAT_INVALID',
          message: `비밀번호는 ${RULE.maxEventPasswordLength}자리 숫자만 가능합니다.`,
        },
        {status: 400},
      );
    }

    const eventId: {eventId: EventId} = {eventId: 'mock-event-id'};
    return HttpResponse.json(eventId, {
      status: 201,
      headers: {
        'Set-Cookie': 'eventToken=mock-event-token',
      },
    });
  }),

  // GET /api/events/:eventId (requestGetEvent)
  http.get(`${MOCK_API_PREFIX}${MEMBER_API_PREFIX}/:eventId`, () => {
    return HttpResponse.json(eventData);
  }),

  // PATCH /api/admin/events/:eventId (requestPatchEvent)
  http.patch<any, {eventName?: string; bankName?: string; accountNumber?: string}>(
    `${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId`,
    async ({request}) => {
      const updates = await request.json();

      Object.assign(eventData, updates);

      return HttpResponse.json({status: 200});
    },
  ),
];
