import {useMutation, useQueryClient} from '@tanstack/react-query';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';
import {RequestPutBill, requestPutBill} from '@apis/request/bill';
import {WithBillId} from '@apis/withId.type';

const useRequestPutBill = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({billId, title, price}: WithBillId<RequestPutBill>) => requestPutBill({eventId, billId, title, price}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
    },
  });

  return {pulBill: mutate, ...rest};
};

export default useRequestPutBill;
