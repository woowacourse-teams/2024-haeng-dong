import {requestGetEventName} from '@apis/request/event';

const getEventName = async (eventId: string) => {
  const {eventName} = await requestGetEventName({eventId});

  return eventName;
};

export default getEventName;
