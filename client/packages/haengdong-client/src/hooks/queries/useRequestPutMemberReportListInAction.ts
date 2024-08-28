import {useMutation, useQueryClient} from '@tanstack/react-query';

import {MemberReportList, requestPutMemberReportListInAction} from '@apis/request/bill';
import {MemberReportInAction} from 'types/serviceType';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPutMemberReportListInAction = (actionId: number) => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, ...mutationProps} = useMutation({
    mutationFn: (members: MemberReportInAction[]) => requestPutMemberReportListInAction({eventId, actionId, members}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReport]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.memberReportInAction, actionId]});
    },
    onMutate: async (newMembers: MemberReportInAction[]) => {
      await queryClient.cancelQueries({queryKey: [QUERY_KEYS.memberReportInAction, actionId]});

      const previousMembers = queryClient.getQueryData([QUERY_KEYS.memberReportInAction, actionId]);

      queryClient.setQueryData([QUERY_KEYS.memberReportInAction, actionId], (oldData: MemberReportList) => ({
        ...oldData,
        members: oldData.members.map((member: MemberReportInAction) => {
          const updatedMember = newMembers.find(m => m.name === member.name);
          return updatedMember ? {...member, ...updatedMember} : member;
        }),
      }));

      return {previousMembers};
    },
    onError: (err, newMembers, context) => {
      if (context?.previousMembers) {
        queryClient.setQueryData([QUERY_KEYS.memberReportInAction, actionId], context.previousMembers);
      }
    },
  });

  return {
    putMemberReportListInAction: mutate,
    mutationProps,
  };
};

export default useRequestPutMemberReportListInAction;
