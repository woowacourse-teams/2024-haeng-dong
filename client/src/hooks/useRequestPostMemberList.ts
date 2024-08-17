import {useMutation, useQueryClient} from '@tanstack/react-query';

import {MemberType} from 'types/serviceType';
import {requestPostMemberList} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

interface PostMemberListMutationProps {
  type: MemberType;
  memberNameList: string[];
}

const useRequestPostMemberList = () => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({type, memberNameList}: PostMemberListMutationProps) =>
      requestPostMemberList({eventId, type, memberNameList}),
    // TODO: (@todari) :  낙관적 업데이트 적고 있었어용
    // onMutate: async ({type, memberNameList}) => {
    //   await queryClient.cancelQueries({queryKey: [QUERY_KEYS.stepList]});

    //   const previousStepList = queryClient.getQueryData([QUERY_KEYS.stepList]);

    //   queryClient.setQueryData([QUERY_KEYS.stepList], (prev: (MemberStep | BillStep)[]) => prev && {

    //   });
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.allMemberList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});
    },
  });
};

export default useRequestPostMemberList;
