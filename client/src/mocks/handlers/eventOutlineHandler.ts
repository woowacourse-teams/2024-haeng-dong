import {http, HttpResponse} from 'msw';

import {EventOutline} from 'types/serviceType';

import {MSW_TEMP_PRIFIX} from '@mocks/serverConstants';

import eventOutline from '../eventOutline.json';

export const eventOutlineHandler = [
  http.get<any, EventOutline, any, `${typeof MSW_TEMP_PRIFIX}/:eventId`>(`${MSW_TEMP_PRIFIX}/:eventId`, () => {
    return HttpResponse.json(eventOutline);
  }),
];
