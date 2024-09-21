import {useQuery} from '@tanstack/react-query';

import {requestGetAllMembers} from '@apis/request/member';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetAllMembers = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  const {data, ...rest} = useQuery({
    queryKey: [QUERY_KEYS.allMembers],
    queryFn: () => requestGetAllMembers({eventId, ...props}),
  });

  return {members: data?.members ?? [], ...rest};
};

export default useRequestGetAllMembers;
