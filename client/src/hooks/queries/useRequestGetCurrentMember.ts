import {useQuery} from '@tanstack/react-query';

import {requestGetCurrentMember} from '@apis/request/member';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetCurrentMember = () => {
  const eventId = getEventIdByUrl();

  return useQuery({
    queryKey: [QUERY_KEYS.currentMember],
    queryFn: () => requestGetCurrentMember({eventId}),
  });
};

export default useRequestGetCurrentMember;
