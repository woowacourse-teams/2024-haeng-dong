import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteEvents} from '@apis/request/event';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestDeleteEvents = () => {
  const queryClient = useQueryClient();

  const {mutateAsync} = useMutation({
    mutationFn: requestDeleteEvents,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.createdEvents]});
    },
  });

  return {
    deleteEvents: mutateAsync,
  };
};

export default useRequestDeleteEvents;
