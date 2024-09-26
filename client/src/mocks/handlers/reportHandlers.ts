import {HttpResponse, http} from 'msw';

import {TEMP_PREFIX} from '@apis/tempPrefix';

import reportListJson from '../reportList.json';

export const reportHandlers = [
  http.get(`${TEMP_PREFIX}/:eventId/actions/reports`, () => {
    return HttpResponse.json({
      reports: reportListJson,
    });
  }),
];
