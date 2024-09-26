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
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetails]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
    },
  });

  return {deleteAsyncMember: mutateAsync, ...rest};
};

export default useRequestDeleteMember;
