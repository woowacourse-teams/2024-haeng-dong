import {useQuery} from '@tanstack/react-query';

import {requestGetMemberReport} from '@apis/request/report';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetMemberReport = () => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.report],
    queryFn: () => requestGetMemberReport({eventId}),
  });
};
export default useRequestGetMemberReport;
