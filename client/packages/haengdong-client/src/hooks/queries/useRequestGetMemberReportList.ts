import {useQuery} from '@tanstack/react-query';

import {requestGetMemberReportList} from '@apis/request/report';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetMemberReportList = () => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.memberReport],
    queryFn: () => requestGetMemberReportList({eventId}),
  });
};
export default useRequestGetMemberReportList;
