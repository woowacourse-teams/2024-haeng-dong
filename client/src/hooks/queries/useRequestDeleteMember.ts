import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestDeleteMember, requestDeleteMember} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestDeleteMember = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({memberId}: RequestDeleteMember) => requestDeleteMember({eventId, memberId}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMember]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetail]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.report]});
    },
  });
};

export default useRequestDeleteMember;
