import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteAllMemberList} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

interface DeleteAllMemberListMutationProps {
  memberName: string;
}

const useRequestDeleteAllMemberList = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({memberName}: DeleteAllMemberListMutationProps) => requestDeleteAllMemberList({eventId, memberName}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMemberList]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.memberReportInAction]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});
    },
  });
};

export default useRequestDeleteAllMemberList;
