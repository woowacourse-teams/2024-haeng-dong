import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPutMembers, requestPutMembers} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPutMembers = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: ({members}: RequestPutMembers) => requestPutMembers({eventId, members}),
    onSuccess: () => {
      // 즉시 서버로 요청
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports, eventId]});

      // 관리 페이지로 되돌아갈 때 요청
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.currentMembers, eventId]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetails, eventId]});

      // 멤버 수정으로 인해 행사 종료가 될 수 있으므로 invalidate 실행
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.createdEvents]});
    },
  });

  return {putAsyncMember: mutateAsync, ...rest};
};

export default useRequestPutMembers;
