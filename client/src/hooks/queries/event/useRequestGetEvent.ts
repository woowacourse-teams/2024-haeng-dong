import {useSuspenseQuery} from '@tanstack/react-query';

import {requestGetEvent} from '@apis/request/event';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetEvent = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useSuspenseQuery({
    queryKey: [QUERY_KEYS.event, eventId],
    queryFn: () => requestGetEvent({eventId, ...props}),
  });

  return {
    eventName: data.eventName,
    bankName: data.bankName,
    accountNumber: data.accountNumber,
    createdByGuest: data.createdByGuest,
    ...rest,
  };
};

export default useRequestGetEvent;
