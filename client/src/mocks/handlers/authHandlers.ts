import {http, HttpResponse} from 'msw';

import {ADMIN_API_PREFIX, MEMBER_API_PREFIX} from '@apis/endpointPrefix';

import {PASSWORD_LENGTH} from '@constants/password';

import {MOCK_API_PREFIX} from '@mocks/mockEndpointPrefix';

export const authHandler = [
  // POST /api/eventId/auth (requestPostAuthentication)
  http.post(`${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId/auth`, () => {
    // return new HttpResponse(null, {status: 200});
    return HttpResponse.json(
      {
        errorCode: 'TOKEN_NOT_FOUND',
        message: '토큰이 존재하지 않습니다.',
      },
      {status: 401},
    );
  }),

  http.get(`${MOCK_API_PREFIX}/api/login/kakao`, () => {
    return new HttpResponse(null, {status: 200});
  }),

  http.get(`${MOCK_API_PREFIX}/api/users/mine`, () => {
    return HttpResponse.json(
      {
        nickname: '크리스마스',
        isGuest: false,
        profileImage: '',
        bankName: '',
        accountNumber: '',
      },
      {status: 200},
    );
  }),

  // POST /api/eventId/login (requestPostToken)
  http.post<{eventId: string}, {password: string}>(
    `${MOCK_API_PREFIX}${MEMBER_API_PREFIX}/:eventId/login`,
    async ({params, request}) => {
      const {eventId} = params;
      const {password} = await request.json();

      if (!password) {
        return HttpResponse.json(
          {
            errorCode: 'REQUEST_EMPTY',
            message: '비밀번호는 공백일 수 없습니다.',
          },
          {status: 400},
        );
      }
      if (password.length !== PASSWORD_LENGTH) {
        return HttpResponse.json(
          {
            errorCode: 'PASSWORD_INVALID',
            message: `비밀번호는 ${PASSWORD_LENGTH}자리여야 합니다.`,
          },
          {status: 400},
        );
      }

      // 비밀번호가 1234인 경우만 성공으로 처리
      if (password === '1234') {
        return new HttpResponse(null, {
          status: 200,
          headers: {
            'Set-Cookie': `eventToken=${eventId}-token`,
          },
        });
      } else {
        return HttpResponse.json(
          {
            errorCode: 'PASSWORD_INCORRECT',
            message: '비밀번호가 올바르지 않습니다.',
          },
          {status: 401},
        );
      }
    },
  ),
];
