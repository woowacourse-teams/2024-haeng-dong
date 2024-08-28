import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPutBillAction} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

interface PutBillActionMutationProps {
  actionId: number;
  title: string;
  price: number;
}

const useRequestPutBillAction = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({actionId, title, price}: PutBillActionMutationProps) =>
      requestPutBillAction({eventId, actionId, title, price}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});
    },
  });
};

export default useRequestPutBillAction;
