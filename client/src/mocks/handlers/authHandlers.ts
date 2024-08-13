import {TEMP_PREFIX} from '@apis/tempPrefix';
import {HttpResponse, http} from 'msw';

type ErrorResponseBody = {
  errorCode: string;
  message: string;
};

type PostLoginParams = {
  eventId: string;
};

type PostLoginRequestBody = {
  password: string;
};

export const authHandler = [
  http.post(`${TEMP_PREFIX}/:eventId/auth`, ({cookies}) => {
    const token = cookies['eventToken'];

    if (token === 'fake-token') {
      return HttpResponse.json(
        {
          errorCode: 'TOKEN_INVALID',
          message: '유효하지 않은 토큰입니다.',
        },
        {status: 401},
      );
    } else if (token) {
      return new HttpResponse(null, {
        status: 200,
      });
    } else {
      return HttpResponse.json(
        {
          errorCode: 'TOKEN_NOT_FOUND',
          message: '토큰이 존재하지 않습니다.',
        },
        {status: 401},
      );
    }
  }),

  // TODO: (@weadie) any를 사용한 이유는..  any가 있는 위치가 이 handler함수의 responseBody타입인데, 아래처럼 return하는 것에 대한 예시가 공문에 없습니다. 함수를 까면 되겠지만 시간이 아깝고 알아낸다고 해서 이 responseBody 타입은 사실 중요한게 아니기 때문에 any로 대체하였습니다.
  http.post<PostLoginParams, PostLoginRequestBody, any, `${typeof TEMP_PREFIX}/:eventId/login`>(
    `${TEMP_PREFIX}/:eventId/login`,
    async ({request}) => {
      const {password} = await request.json();

      if (password === '1111') {
        return new HttpResponse(null, {
          headers: {
            'Set-Cookie': 'eventToken=abc-123',
          },
        });
      } else if (password.length < 4) {
        return HttpResponse.json(
          {
            errorCode: 'EVENT_PASSWORD_FORMAT_INVALID',
            message: '비밀번호는 4자리 숫자만 가능합니다.',
          },
          {status: 401},
        );
      } else if (password === undefined) {
        return HttpResponse.json(
          {
            errorCode: 'REQUEST_EMPTY',
            message: '비밀번호는 공백일 수 없습니다.',
          },
          {status: 401},
        );
      } else {
        return HttpResponse.json(
          {
            errorCode: 'PASSWORD_INVALID',
            message: '비밀번호가 일치하지 않습니다.',
          },
          {status: 401},
        );
      }
    },
  ),
];
