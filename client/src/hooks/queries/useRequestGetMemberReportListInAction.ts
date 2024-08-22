import {useQuery} from '@tanstack/react-query';

import {requestGetMemberReportListInAction} from '@apis/request/bill';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetMemberReportListInAction = (actionId: number) => {
  const eventId = getEventIdByUrl();

  const {data, ...queryResult} = useQuery({
    queryKey: [QUERY_KEYS.memberReportInAction, actionId],
    queryFn: () => requestGetMemberReportListInAction({eventId, actionId}),
    select: data => data.members,
  });

  return {
    memberReportListInActionFromServer: data ?? [],
    queryResult,
  };
};

export default useRequestGetMemberReportListInAction;
