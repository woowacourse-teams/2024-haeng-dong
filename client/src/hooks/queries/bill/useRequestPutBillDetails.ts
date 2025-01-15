import {useMutation, useQueryClient} from '@tanstack/react-query';

import {RequestPutBillDetails, requestPutBillDetails} from '@apis/request/bill';

import {WithBillId} from '@apis/withId.type';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestPutBillDetails = ({billId}: WithBillId) => {
  const eventId = getEventIdByUrl();
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({billId, billDetails}: WithBillId<RequestPutBillDetails>) =>
      requestPutBillDetails({eventId, billId, billDetails}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.steps, eventId]});
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.reports, eventId]});
      queryClient.removeQueries({queryKey: [QUERY_KEYS.billDetails, eventId, billId]});
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

  return {putBillDetails: mutate, ...rest};
};

export default useRequestPutBillDetails;
