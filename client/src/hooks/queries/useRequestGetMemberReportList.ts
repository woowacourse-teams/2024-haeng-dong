import {useQuery} from '@tanstack/react-query';

import {requestGetMemberReportList} from '@apis/request/report';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetMemberReportList = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.memberReport],
    queryFn: () => requestGetMemberReportList({eventId, ...props}),
  });
};
export default useRequestGetMemberReportList;
