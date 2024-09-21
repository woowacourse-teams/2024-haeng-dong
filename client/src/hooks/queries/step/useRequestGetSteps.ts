import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

import {requestGetSteps} from '@apis/request/step';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetSteps = () => {
  const eventId = getEventIdByUrl();
  const {updateTotalExpenseAmount} = useTotalExpenseAmountStore();

  const queryResult = useQuery({
    queryKey: [QUERY_KEYS.steps],
    queryFn: () => requestGetSteps({eventId}),
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
