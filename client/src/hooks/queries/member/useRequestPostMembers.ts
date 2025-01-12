import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPostMembers, requestPostMembers} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPostMembers = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, mutateAsync, data, ...rest} = useMutation({
    mutationFn: ({members}: RequestPostMembers) => requestPostMembers({eventId, members}),
    onSuccess: responseData => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.currentMembers, eventId]});

      // merge 할 때 조심 #921 브랜치에서 위 invalidate 조작했다는 것을
      // 멤버 추가로 인해 행사 종료가 될 수 있으므로 invalidate 실행
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.createdEvents]});
      return responseData;
    },
  });

  return {postMembers: mutate, postMembersAsync: mutateAsync, responseMemberIds: data, ...rest};
};

export default useRequestPostMembers;
