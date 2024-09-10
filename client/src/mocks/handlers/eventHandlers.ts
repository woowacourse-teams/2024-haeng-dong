import {HttpResponse, http} from 'msw';

import {RequestPostNewEvent, ResponsePostNewEvent} from '@apis/request/event';

import {USER_API_PREFIX} from '@apis/enpointPrefix';

import {PASSWORD_LENGTH} from '@constants/password';

import {VALID_EVENT_NAME_LENGTH_IN_SERVER} from '@mocks/serverConstants';

type ErrorResponseBody = {
  errorCode: string;
  message: string;
};

export const eventHandler = [
  http.post<any, RequestPostNewEvent, ResponsePostNewEvent | ErrorResponseBody, `${typeof USER_API_PREFIX}`>(
    `${USER_API_PREFIX}`,
    async ({request}) => {
      const {eventName, password} = await request.json();

      if (String(password).length < PASSWORD_LENGTH) {
        return HttpResponse.json(
          {
            errorCode: 'EVENT_PASSWORD_FORMAT_INVALID',
            message: '비밀번호는 4자리 숫자만 가능합니다.',
          },
          {status: 401},
        );
      } else if (
        eventName.length < VALID_EVENT_NAME_LENGTH_IN_SERVER.min ||
        eventName.length > VALID_EVENT_NAME_LENGTH_IN_SERVER.max
      ) {
        return HttpResponse.json(
          {
            errorCode: 'EVENT_NAME_LENGTH_INVALID',
            message: `행사 이름은 2자 이상 30자 이하만 입력 가능합니다. 입력한 이름 길이 : ${eventName.length}`,
          },
          {status: 401},
        );
      } else {
        return HttpResponse.json(
          {
            eventId: 'eventId',
          },
          {
            headers: {
              'Set-Cookie': 'eventToken=abc-123',
            },
          },
        );
      }
    },
  ),
];
