import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteMemberAction} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

interface DeleteMemberActionMutationProps {
  actionId: number;
}

const useRequestDeleteMemberAction = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({actionId}: DeleteMemberActionMutationProps) => requestDeleteMemberAction({eventId, actionId}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});
    },
  });
};

export default useRequestDeleteMemberAction;
