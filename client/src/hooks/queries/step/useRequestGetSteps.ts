import {useQuery} from '@tanstack/react-query';

import {requestGetSteps} from '@apis/request/step';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetSteps = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();

  const queryResult = useQuery({
    queryKey: [QUERY_KEYS.steps],
    queryFn: () => requestGetSteps({eventId, ...props}),
  });

  return {
    steps: queryResult.data ?? [],
    ...queryResult,
  };
};

export default useRequestGetSteps;
