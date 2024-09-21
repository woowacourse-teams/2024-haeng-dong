import {http, HttpResponse} from 'msw';

import {USER_API_PREFIX} from '@apis/endpointPrefix';

import {MOCK_API_PREFIX} from '@mocks/mockEndpointPrefix';
import {reportData} from '@mocks/sharedState';

export const reportHandlers = [
  // GET /api/eventId/reports (requestGetMemberReport)
  http.get(`${MOCK_API_PREFIX}${USER_API_PREFIX}/:eventId/reports`, () => {
    return HttpResponse.json(reportData);
  }),
];
