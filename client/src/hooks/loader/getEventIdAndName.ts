import type {EventIdAndName} from 'types/serviceType';

import getEventId from './getEventId';
import getEventName from './getEventName';

const getEventIdAndName = async (): Promise<EventIdAndName> => {
  const eventId = getEventId();
  const eventName = await getEventName(eventId);

  return {eventId, eventName};
};

export default getEventIdAndName;
