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
    onSuccess: (_, {billId}) => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.currentMembers, eventId]});

      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetails, billId, eventId]});
    },
  });

  return {
    deleteBill: mutate,
    ...rest,
  };
};

export default useRequestDeleteBill;
