import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPostMembers, requestPostMembers} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPostMembers = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, data, ...rest} = useMutation({
    mutationFn: ({members}: RequestPostMembers) => requestPostMembers({eventId, members}),
    onSuccess: responseData => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
      return responseData;
    },
  });

  return {postMembers: mutate, responseMemberIds: data, ...rest};
};

export default useRequestPostMembers;
