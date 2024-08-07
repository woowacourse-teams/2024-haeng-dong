import {http, HttpResponse} from 'msw';

import {TEMP_PREFIX} from '@apis/tempPrefix';

export const handlers = [
  http.post(`${process.env.API_BASE_URL!}${TEMP_PREFIX}`, ({request}) => {
    return HttpResponse.json(
      {errorCode: 'ACTION_NOT_FOUND', message: 'msw모킹함수의 에러메세지입니다.'},
      {status: 404},
    );
  }),
];
