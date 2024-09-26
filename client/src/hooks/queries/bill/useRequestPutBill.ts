import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPutBill, requestPutBill} from '@apis/request/bill';

import {WithBillId} from '@apis/withId.type';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPutBill = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, mutateAsync, ...rest} = useMutation({
    mutationFn: ({billId, title, price}: WithBillId<RequestPutBill>) => requestPutBill({eventId, billId, title, price}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
    },
  });

  return {putBill: mutate, putBillAsync: mutateAsync, ...rest};
};

export default useRequestPutBill;
