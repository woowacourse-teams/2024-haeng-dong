import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestDeleteMember, requestDeleteMember} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestDeleteMember = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutateAsync, ...rest} = useMutation({
    mutationFn: ({memberId}: RequestDeleteMember) => requestDeleteMember({eventId, memberId}),
    onSuccess: () => {
      // putAsyncMember 전에만 실행되는 hook이라 데이터를 무효화하지 않아도 putAsyncMember가 무효화한다.
      // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports, eventId]});

      // 현재 페이지에서 active하지 않음
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.currentMembers, eventId]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetails, eventId]});

      // 멤버 변경으로 인해 행사 종료가 될 수 있으므로 invalidate 실행
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.createdEvents]});
    },
  });

  return {deleteAsyncMember: mutateAsync, ...rest};
};

export default useRequestDeleteMember;
