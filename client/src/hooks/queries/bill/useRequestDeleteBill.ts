import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestDeleteBill} from '@apis/request/bill';

import {WithBillId} from '@apis/withId.type';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestDeleteBill = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({billId}: WithBillId) => requestDeleteBill({eventId, billId}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.currentMembers]});
    },
  });

  return {
    deleteBill: mutate,
    ...rest,
  };
};

export default useRequestDeleteBill;
