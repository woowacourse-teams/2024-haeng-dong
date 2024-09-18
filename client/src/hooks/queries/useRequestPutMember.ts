import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPutMember, requestPutMember} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPutMember = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({members}: RequestPutMember) => requestPutMember({eventId, members}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMember]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetail]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.report]});
    },
  });
};

export default useRequestPutMember;
