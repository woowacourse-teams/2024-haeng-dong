import {HttpResponse, http} from 'msw';

import {USER_API_PREFIX} from '@apis/enpointPrefix';

import reportListJson from '../reportList.json';

export const reportHandlers = [
  http.get(`${USER_API_PREFIX}/:eventId/actions/reports`, () => {
    return HttpResponse.json({
      reports: reportListJson,
    });
  }),
];
