import type {Event} from 'types/serviceType';

import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPatchEvent} from '@apis/request/event';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPatchEventOutline = () => {
  const eventId = getEventIdByUrl();

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: (eventOutline: Partial<Event>) => requestPatchEvent({eventId, eventOutline}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.event],
      });
    },
  });

  return {
    patchEventOutline: mutate,
  };
};

export default useRequestPatchEventOutline;
