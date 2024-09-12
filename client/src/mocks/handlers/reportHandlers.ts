import {HttpResponse, http} from 'msw';

import {USER_API_PREFIX} from '@apis/endpointPrefix';

import reportListJson from '../reportList.json';
import {MOCK_API_PREFIX} from '@mocks/mockEndpointPrefix';

export const reportHandlers = [
  http.get(`${MOCK_API_PREFIX}${USER_API_PREFIX}/:eventId/actions/reports`, () => {
    return HttpResponse.json({
      reports: reportListJson,
    });
  }),
];
