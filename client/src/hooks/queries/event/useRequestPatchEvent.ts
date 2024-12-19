import {useMutation, useQueryClient} from '@tanstack/react-query';

import {PartialEvent, requestPatchEvent} from '@apis/request/event';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPatchEvent = () => {
  const eventId = getEventIdByUrl();

  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: (partialEvent: PartialEvent) => requestPatchEvent({eventId, ...partialEvent}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.event],
      });
    },
  });

  return {
    patchEvent: mutateAsync,
    ...rest,
  };
};

export default useRequestPatchEvent;
