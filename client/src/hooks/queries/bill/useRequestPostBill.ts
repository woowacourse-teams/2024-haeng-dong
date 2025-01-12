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
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports, eventId]});

      // admin으로 navigate 되기 전 invalidate 실행 시 api를 불러오는 문제 발생 => remove를 사용하여 캐시 데이터 삭제하는 방식으로 해결s
      queryClient.removeQueries({queryKey: [QUERY_KEYS.currentMembers, eventId]});
    },
  });

  return {
    postBill: mutate,
    ...rest,
  };
};

export default useRequestPostBill;
