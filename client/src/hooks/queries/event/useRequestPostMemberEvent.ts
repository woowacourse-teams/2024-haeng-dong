import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPostMemberEvent} from '@apis/request/event';
import {CreateEventArgs, EventName} from 'types/createEvent';

const useRequestPostMemberEvent = () => {
  const queryClient = useQueryClient();

  const {mutate, mutateAsync, ...rest} = useMutation({
    mutationFn: (eventName: EventName) => requestPostMemberEvent(eventName),
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });

  // 실행 순서를 await으로 보장하기 위해 mutateAsync 사용
  return {
    postEvent: mutateAsync,
    isPostEventPending: rest.isPending,
    ...rest,
  };
};

export default useRequestPostMemberEvent;
