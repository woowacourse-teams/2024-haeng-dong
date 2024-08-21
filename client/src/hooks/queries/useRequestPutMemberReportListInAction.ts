import {useMutation, useQueryClient} from '@tanstack/react-query';

import {requestPutMemberReportListInAction} from '@apis/request/bill';
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
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.memberReportInAction, actionId]});
    },
  });

  return {
    putMemberReportListInAction: mutate,
    mutationProps,
  };
};

export default useRequestPutMemberReportListInAction;
