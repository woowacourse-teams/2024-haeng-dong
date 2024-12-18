import {useQuery} from '@tanstack/react-query';

import {requestGetCreatedEvents} from '@apis/request/event';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetCreatedEvents = () => {
  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.createdEvents],
    queryFn: () => requestGetCreatedEvents(),
    select: data => ({
      ...data,
      events: data.events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    }),
  });

  return {
    events: data?.events,
    ...rest,
  };
};

export default useRequestGetCreatedEvents;
