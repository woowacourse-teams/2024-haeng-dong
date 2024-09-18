import {useMutation} from '@tanstack/react-query';

import {RequestPostEvent, requestPostEvent} from '@apis/request/event';

const useRequestPostEvent = () => {
  return useMutation({
    mutationFn: ({eventName, password}: RequestPostEvent) => requestPostEvent({eventName, password}),
  });
};

export default useRequestPostEvent;
