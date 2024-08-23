import {HttpResponse, http} from 'msw';

export const testHandler = [
  http.post(`/throw-handle-error`, () => {
    return HttpResponse.json(
      {
        errorCode: 'TOKEN_NOT_FOUND',
        message: '핸들링되는 테스트 에러입니다.',
      },
      {status: 400},
    );
  }),

  http.post(`/throw-unhandle-error`, () => {
    return HttpResponse.json(
      {
        errorCode: 'strange error',
        message: '핸들링이 안되는 테스트 에러입니다.',
      },
      {status: 500},
    );
  }),
];
