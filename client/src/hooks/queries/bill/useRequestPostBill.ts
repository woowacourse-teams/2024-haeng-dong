import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPostBill, requestPostBill} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPostBill = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({title, price, memberIds}: RequestPostBill) => requestPostBill({eventId, title, price, memberIds}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.currentMembers]});
    },
  });

  return {
    postBill: mutate,
    ...rest,
  };
};

export default useRequestPostBill;
