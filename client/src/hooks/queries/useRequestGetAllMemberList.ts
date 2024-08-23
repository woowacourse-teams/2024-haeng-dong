import {useQuery} from '@tanstack/react-query';

import {requestGetAllMemberList} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetAllMemberList = () => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.allMemberList],
    queryFn: () => requestGetAllMemberList({eventId}),
  });
};

export default useRequestGetAllMemberList;
