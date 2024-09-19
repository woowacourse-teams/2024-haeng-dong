import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPatchEventOutline} from '@apis/request/event';
import {EventOutline} from 'types/serviceType';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPatchEventOutline = () => {
  const eventId = getEventIdByUrl();

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: (eventOutline: Partial<EventOutline>) => requestPatchEventOutline({eventId, eventOutline}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.eventOutline],
      });
    },
  });

  return {
    patchEventOutline: mutate,
  };
};

export default useRequestPatchEventOutline;
