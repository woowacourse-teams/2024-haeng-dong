import {useQuery} from '@tanstack/react-query';

import {requestGetEventName} from '@apis/request/event';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetEventName = () => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.eventName],
    queryFn: () => requestGetEventName({eventId}),
  });
};

export default useRequestGetEventName;
