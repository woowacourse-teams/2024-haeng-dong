import {useMutation, useQueryClient} from '@tanstack/react-query';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';
import {RequestPutBillDetail, requestPutBillDetail} from '@apis/request/bill';
import {WithBillId} from '@apis/withId.type';

const useRequestPutBillDetail = (actionId: number) => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({billId, billDetails}: WithBillId<RequestPutBillDetail>) =>
      requestPutBillDetail({eventId, billId, billDetails}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.stepList]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.report]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetail, actionId]});
    },
    // onMutate: async (newMembers: MemberReportInAction[]) => {
    //   await queryClient.cancelQueries({queryKey: [QUERY_KEYS.memberReportInAction, actionId]});

    //   const previousMembers = queryClient.getQueryData([QUERY_KEYS.memberReportInAction, actionId]);

    //   queryClient.setQueryData([QUERY_KEYS.memberReportInAction, actionId], (oldData: MemberReportList) => ({
    //     ...oldData,
    //     members: oldData.members.map((member: MemberReportInAction) => {
    //       const updatedMember = newMembers.find(m => m.name === member.name);
    //       return updatedMember ? {...member, ...updatedMember} : member;
    //     }),
    //   }));

    //   return {previousMembers};
    // },
    // onError: (err, newMembers, context) => {
    //   if (context?.previousMembers) {
    //     queryClient.setQueryData([QUERY_KEYS.memberReportInAction, actionId], context.previousMembers);
    //   }
    // },
  });
};

export default useRequestPutBillDetail;
