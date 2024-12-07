import type {Event} from 'types/serviceType';

import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPatchEventName} from '@apis/request/event';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPatchEventName = () => {
  const eventId = getEventIdByUrl();

  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: (eventName: string) => requestPatchEventName({eventId, eventName}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.event],
      });
    },
  });

  return {
    patchEventOutline: mutateAsync,
    ...rest,
  };
};

export default useRequestPatchEventName;
