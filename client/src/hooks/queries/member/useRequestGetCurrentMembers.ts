import {useQuery} from '@tanstack/react-query';

import {requestGetCurrentMembers} from '@apis/request/member';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetCurrentMembers = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.currentMembers],
    queryFn: () => requestGetCurrentMembers({eventId, ...props}),
  });

  return {currentMembers: data?.members ?? [], ...rest};
};

export default useRequestGetCurrentMembers;
