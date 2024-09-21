import {useQuery} from '@tanstack/react-query';

import {requestGetReports} from '@apis/request/report';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetReports = () => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.reports],
    queryFn: () => requestGetReports({eventId}),
  });

  return {
    reports: data?.reports ?? [],
    ...rest,
  };
};
export default useRequestGetReports;
