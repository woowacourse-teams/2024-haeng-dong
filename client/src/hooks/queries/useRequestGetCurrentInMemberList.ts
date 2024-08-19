import {useQuery} from '@tanstack/react-query';

import {requestGetCurrentInMemberList} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetCurrentInMemberList = () => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.currentInMember],
    queryFn: () => requestGetCurrentInMemberList({eventId}),
  });
};

export default useRequestGetCurrentInMemberList;
