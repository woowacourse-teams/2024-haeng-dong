import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteBillAction} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

interface DeleteBillActionMutationProps {
  actionId: number;
}

const useRequestDeleteBillAction = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({actionId}: DeleteBillActionMutationProps) => requestDeleteBillAction({eventId, actionId}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});
    },
  });
};

export default useRequestDeleteBillAction;
