import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPostMember, requestPostMember} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPostMember = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({members}: RequestPostMember) => requestPostMember({eventId, members}),
    // TODO: (@todari) :  낙관적 업데이트 적고 있었어용
    // onMutate: async ({type, memberName}) => {
    //   await queryClient.cancelQueries({queryKey: [QUERY_KEYS.step]});
    //   const previousStep = queryClient.getQueryData([QUERY_KEYS.step]);
    //   queryClient.setQueryData([QUERY_KEYS.step], (prev: (MemberStep | BillStep)[]) => prev && {
    //   });
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMember]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.report]});
    },
  });
};

export default useRequestPostMember;
