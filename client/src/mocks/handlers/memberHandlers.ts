import {TEMP_PREFIX} from '@apis/tempPrefix';
import {HttpResponse, http} from 'msw';
import memberActionStepListJson from '../memberActionStepList.json';
import {StepList} from 'types/serviceType';

const stepListMockData = memberActionStepListJson;

type Member = {
  name: string;
};

type CurrentMemberListResponseBody = {
  members: Member[];
};

export const memberHandler = [
  http.get<any, any, CurrentMemberListResponseBody, `${typeof TEMP_PREFIX}/:eventId/members/current`>(
    `${TEMP_PREFIX}/:eventId/members/current`,
    () => {
      return HttpResponse.json({
        members: stepListMockData[0].actions.map(({name}) => ({name})),
      });
    },
  ),

  http.delete(`${TEMP_PREFIX}/:eventId/member-actions/:actionId`, () => {
    return HttpResponse.json({
      status: 200,
    });
  }),
];
