import {HttpResponse, http} from 'msw';

import {MSW_TEMP_PRIFIX} from '@mocks/serverConstants';

import reportListJson from '../reportList.json';

export const reportHandlers = [
  http.get(`${MSW_TEMP_PRIFIX}/:eventId/actions/reports`, () => {
    return HttpResponse.json({
      reports: reportListJson,
    });
  }),
];
