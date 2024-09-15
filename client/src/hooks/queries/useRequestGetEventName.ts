import {useQuery} from '@tanstack/react-query';

import {requestGetEventName} from '@apis/request/event';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetEventName = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.eventName],
    queryFn: () => requestGetEventName({eventId, ...props}),
  });
};

export default useRequestGetEventName;
