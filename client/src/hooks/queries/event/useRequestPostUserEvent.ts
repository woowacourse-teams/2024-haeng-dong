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

  // 실행 순서를 await으로 보장하기 위해 mutateAsync 사용
  return {
    postEvent: mutateAsync,
    isPostEventPending: rest.isPending,
    ...rest,
  };
};

export default useRequestPostUserEvent;
