import {useMutation} from '@tanstack/react-query';

import {RequestPostEvent, requestPostEvent} from '@apis/request/event';

const useRequestPostEvent = () => {
  const {mutate, ...rest} = useMutation({
    mutationFn: ({eventName, password}: RequestPostEvent) => requestPostEvent({eventName, password}),
  });

  return {
    postEvent: mutate,
    isPostEventPending: rest.isPending,
    ...rest,
  };
};

export default useRequestPostEvent;
