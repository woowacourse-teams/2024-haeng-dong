import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPostEvent, requestPostEvent} from '@apis/request/event';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPostEvent = () => {
  const queryClient = useQueryClient();

  const {mutate, mutateAsync, ...rest} = useMutation({
    mutationFn: ({eventName, password}: RequestPostEvent) => requestPostEvent({eventName, password}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.event]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.currentMembers]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.billDetails]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.images]});
    },
  });

  // 실행 순서를 await으로 보장하기 위해 mutateAsync 사용
  return {
    postEvent: mutateAsync,
    isPostEventPending: rest.isPending,
    ...rest,
  };
};

export default useRequestPostEvent;
