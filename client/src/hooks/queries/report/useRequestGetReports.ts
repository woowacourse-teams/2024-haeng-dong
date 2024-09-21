import {useQuery} from '@tanstack/react-query';

import {requestGetReports} from '@apis/request/report';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetReports = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.reports],
    queryFn: () => requestGetReports({eventId, ...props}),
  });

  return {
    reports: data?.reports ?? [],
    ...rest,
  };
};
export default useRequestGetReports;
