import {useQuery} from '@tanstack/react-query';

import {requestGetEvent} from '@apis/request/event';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetEvent = () => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.eventName],
    queryFn: () => requestGetEvent({eventId}),
  });
};

export default useRequestGetEvent;
