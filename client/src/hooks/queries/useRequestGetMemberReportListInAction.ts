import {useQuery} from '@tanstack/react-query';

import {requestGetMemberReportListInAction} from '@apis/request/bill';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

type UseRequestGetMemberReportListInAction = {
  actionId: number;
};

const useRequestGetMemberReportListInAction = ({
  actionId,
  ...props
}: WithErrorHandlingStrategy<UseRequestGetMemberReportListInAction>) => {
  const eventId = getEventIdByUrl();

  const {data, ...queryResult} = useQuery({
    queryKey: [QUERY_KEYS.memberReportInAction, actionId],
    queryFn: () => requestGetMemberReportListInAction({eventId, actionId, ...props}),
    select: data => data.members,
  });

  return {
    memberReportListInActionFromServer: data ?? [],
    queryResult,
  };
};

export default useRequestGetMemberReportListInAction;
