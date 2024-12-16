import {useQuery} from '@tanstack/react-query';

import {requestGetCreatedEvents} from '@apis/request/event';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetCreatedEvents = () => {
  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.createdEvents],
    queryFn: () => requestGetCreatedEvents(),
  });

  return {
    events: data?.events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    ...rest,
  };
};

export default useRequestGetCreatedEvents;
