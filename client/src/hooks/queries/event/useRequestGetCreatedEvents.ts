import {useQuery} from '@tanstack/react-query';

import {requestGetCreatedEvents} from '@apis/request/event';
import {CreatedEvent} from 'types/serviceType';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetCreatedEvents = () => {
  const sortByCreatedAndFinishedStatus = (a: CreatedEvent, b: CreatedEvent) => {
    if (a.isFinished !== b.isFinished) {
      return a.isFinished ? 1 : -1;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  };

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.createdEvents],
    queryFn: () => requestGetCreatedEvents(),
    select: data => ({
      ...data,
      events: data.events.sort(sortByCreatedAndFinishedStatus),
    }),
  });

  return {
    events: data?.events,
    ...rest,
  };
};

export default useRequestGetCreatedEvents;
