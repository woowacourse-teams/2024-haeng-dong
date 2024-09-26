import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPutMembers, requestPutMembers} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPutMembers = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: ({members}: RequestPutMembers) => requestPutMembers({eventId, members}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetails]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
    },
  });

  return {putAsyncMember: mutateAsync, ...rest};
};

export default useRequestPutMembers;
