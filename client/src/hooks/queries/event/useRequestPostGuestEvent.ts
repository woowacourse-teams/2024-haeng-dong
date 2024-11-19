import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPostGuestEvent} from '@apis/request/event';
import {CreateEventArgs} from 'types/createEvent';

const useRequestPostGuestEvent = () => {
  const queryClient = useQueryClient();

  const {mutate, mutateAsync, ...rest} = useMutation({
    mutationFn: ({eventName, nickname, password}: CreateEventArgs) =>
      requestPostGuestEvent({eventName, nickname, password}),
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

export default useRequestPostGuestEvent;
