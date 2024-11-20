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

  const sortedMemberNameReports = data?.reports.sort((a, b) => a.memberName.localeCompare(b.memberName));

  return {
    reports: sortedMemberNameReports ?? [],
    ...rest,
  };
};
export default useRequestGetReports;
