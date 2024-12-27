import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPostUserEvent} from '@apis/request/event';
import {EventName} from 'types/serviceType';

const useRequestPostUserEvent = () => {
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: (eventName: EventName) => requestPostUserEvent(eventName),
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });

  return {
    postEvent: mutateAsync,
    isPostEventPending: rest.isPending,
    ...rest,
  };
};

export default useRequestPostUserEvent;
