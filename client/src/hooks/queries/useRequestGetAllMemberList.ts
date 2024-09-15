import {useQuery} from '@tanstack/react-query';

import {requestGetAllMemberList} from '@apis/request/member';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetAllMemberList = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.allMemberList],
    queryFn: () => requestGetAllMemberList({eventId, ...props}),
  });
};

export default useRequestGetAllMemberList;
