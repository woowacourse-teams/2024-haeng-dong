import {TEMP_PREFIX} from '@apis/tempPrefix';
import {requestGet, requestPost} from '@apis/fetcher';
import {WithEventId} from '@apis/withEventId.type';

type RequestCreateNewEvent = {
  eventName: string;
};

type ResponseCreateNewEvent = {
  eventId: string;
};

export const requestCreateNewEvent = async ({eventName}: RequestCreateNewEvent) => {
  // TODO: (@weadie) 뼈대만 둔 것. header값을 꺼내오는 로직이 필요하다. 또는 바디에 달라고 부탁할 수 있다.
  return requestPost<ResponseCreateNewEvent>({
    endpoint: TEMP_PREFIX,
    body: {eventName},
  });
};

type ResponseGetEventName = {
  eventName: string;
};

export const requestGetEventName = async ({eventId}: WithEventId) => {
  return requestGet<ResponseGetEventName>({
    endpoint: `${TEMP_PREFIX}/${eventId}`,
  });
};
