import {useQuery} from '@tanstack/react-query';

import {requestGetAllMember} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetAllMember = () => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.allMember],
    queryFn: () => requestGetAllMember({eventId}),
  });
};

export default useRequestGetAllMember;
