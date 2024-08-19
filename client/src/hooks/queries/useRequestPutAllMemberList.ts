import {useMutation, useQueryClient} from '@tanstack/react-query';

import {MemberChange, requestPutAllMemberList} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

interface PutAllMemberListMutationProps {
  members: MemberChange[];
}

const useRequestPutAllMemberList = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({members}: PutAllMemberListMutationProps) => requestPutAllMemberList({eventId, members}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMemberList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});
    },
  });
};

export default useRequestPutAllMemberList;
