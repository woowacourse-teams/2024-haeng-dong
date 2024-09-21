import {useQuery} from '@tanstack/react-query';

import {requestGetEvent} from '@apis/request/event';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetEvent = () => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.eventName],
    queryFn: () => requestGetEvent({eventId}),
  });

  return {
    eventName: data?.eventName ?? '',
    bankName: data?.bankName,
    accountName: data?.accountNumber,
    ...rest,
  };
};

export default useRequestGetEvent;
