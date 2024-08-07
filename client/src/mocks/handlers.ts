import {http, HttpResponse} from 'msw';

import {TEMP_PREFIX} from '@apis/tempPrefix';

export const handlers = [
  http.post(`${process.env.API_BASE_URL!}/${TEMP_PREFIX}`, ({request}) => {
    return HttpResponse.json({errorCode: 'testCode', message: 'testMessage'}, {status: 404});
  }),
];
