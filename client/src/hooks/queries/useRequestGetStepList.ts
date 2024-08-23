import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

import {requestGetStepList} from '@apis/request/stepList';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const useRequestGetStepList = () => {
  const eventId = getEventIdByUrl();
  const {updateTotalExpenseAmount} = useTotalExpenseAmountStore();

  const queryResult = useQuery({
    queryKey: [QUERY_KEYS.stepList],
    queryFn: () => requestGetStepList({eventId}),
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      updateTotalExpenseAmount(queryResult.data);
    }
  }, [queryResult.data, queryResult.isSuccess, updateTotalExpenseAmount]);

  return queryResult;
};

export default useRequestGetStepList;
