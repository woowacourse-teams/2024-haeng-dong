import {useMutation} from '@tanstack/react-query';

import {requestPostNewEvent} from '@apis/request/event';

interface PostEventMutationProps {
  eventName: string;
  password: string;
}

const usePostEvent = () => {
  return useMutation({
    mutationFn: ({eventName, password}: PostEventMutationProps) => requestPostNewEvent({eventName, password}),
  });
};

export default usePostEvent;
