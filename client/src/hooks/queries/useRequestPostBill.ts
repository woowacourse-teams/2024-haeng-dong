import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPostBill, requestPostBill} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPostBill = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({title, price, members}: RequestPostBill) => requestPostBill({eventId, title, price, members}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.report]});
    },
  });
};

export default useRequestPostBill;
