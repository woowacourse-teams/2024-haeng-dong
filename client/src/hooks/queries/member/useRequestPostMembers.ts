import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPostMembers, requestPostMembers} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPostMembers = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({members}: RequestPostMembers) => requestPostMembers({eventId, members}),
    // TODO: (@todari) :  낙관적 업데이트 적고 있었어용
    // onMutate: async ({type, memberName}) => {
    //   await queryClient.cancelQueries({queryKey: [QUERY_KEYS.step]});
    //   const previousStep = queryClient.getQueryData([QUERY_KEYS.step]);
    //   queryClient.setQueryData([QUERY_KEYS.step], (prev: (MemberStep | BillStep)[]) => prev && {
    //   });
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMembers]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports]});
    },
  });

  return {postMember: mutate, ...rest};
};

export default useRequestPostMembers;
