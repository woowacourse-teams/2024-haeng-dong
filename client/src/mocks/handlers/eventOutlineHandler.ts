import {http, HttpResponse} from 'msw';

import {EventOutline} from 'types/serviceType';

import {MOCK_API_PREFIX} from '@mocks/mockEndpointPrefix';

import eventOutline from '../eventOutline.json';

export const eventOutlineHandler = [
  http.get<any, EventOutline, any, `${typeof MOCK_API_PREFIX}/:eventId`>(`${MOCK_API_PREFIX}/:eventId`, () => {
    return HttpResponse.json(eventOutline);
  }),
];
