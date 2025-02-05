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

      // post member는 현재 post bill 이전에만 실행되므로 아래 invalidate는 무의미하지만 나중에 단독으로 이 api가 불릴 때를 위해서 남겨뒀습니다.
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports, eventId]});

      // 멤버 추가로 인해 행사 종료가 될 수 있으므로 invalidate 실행
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.createdEvents]});
      return responseData;
    },
  });

  return {postMembers: mutate, postMembersAsync: mutateAsync, responseMemberIds: data, ...rest};
};

export default useRequestPostMembers;
