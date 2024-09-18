import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteBill} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';
import {WithBillId} from '@apis/withId.type';

const useRequestDeleteBill = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({billId}: WithBillId) => requestDeleteBill({eventId, billId}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.report]});
    },
  });
};

export default useRequestDeleteBill;
