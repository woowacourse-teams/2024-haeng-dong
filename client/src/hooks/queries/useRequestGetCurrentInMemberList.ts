import {useQuery} from '@tanstack/react-query';

import {requestGetCurrentInMemberList} from '@apis/request/member';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetCurrentInMemberList = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.currentInMember],
    queryFn: () => requestGetCurrentInMemberList({eventId, ...props}),
  });
};

export default useRequestGetCurrentInMemberList;
