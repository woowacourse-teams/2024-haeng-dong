import {useQuery} from '@tanstack/react-query';

import {requestGetEventOutline} from '@apis/request/event';

import QUERY_KEYS from '@constants/queryKeys';

type UseRequestGetEventOutline = {
  eventId: string;
};

const useRequestGetEventOutline = ({eventId}: UseRequestGetEventOutline) => {
  const {data} = useQuery({
    queryKey: [QUERY_KEYS.eventOutline],
    queryFn: () => requestGetEventOutline({eventId}),
  });

  return {
    eventName: data?.eventName ?? '',
    ...data,
  };
};

export default useRequestGetEventOutline;
