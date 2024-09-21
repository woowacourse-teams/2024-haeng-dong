import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

import {requestGetSteps} from '@apis/request/step';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetSteps = ({...props}: WithErrorHandlingStrategy | null = {}) => {
  const eventId = getEventIdByUrl();
  const {updateTotalExpenseAmount} = useTotalExpenseAmountStore();

  const queryResult = useQuery({
    queryKey: [QUERY_KEYS.steps],
    queryFn: () => requestGetSteps({eventId, ...props}),
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      updateTotalExpenseAmount(queryResult.data);
    }
  }, [queryResult.data, queryResult.isSuccess, updateTotalExpenseAmount]);

  return {
    steps: queryResult.data ?? [],
    ...queryResult,
  };
};

export default useRequestGetSteps;
