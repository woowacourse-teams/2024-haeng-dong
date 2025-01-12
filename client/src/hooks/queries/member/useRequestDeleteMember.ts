import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestDeleteMember, requestDeleteMember} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestDeleteMember = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: ({memberId}: RequestDeleteMember) => requestDeleteMember({eventId, memberId}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.currentMembers, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports, eventId]});

      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetails, eventId]});
    },
  });

  return {deleteAsyncMember: mutateAsync, ...rest};
};

export default useRequestDeleteMember;
