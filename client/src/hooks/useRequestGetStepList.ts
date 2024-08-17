import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

import {requestGetStepList} from '@apis/request/stepList';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import {getTotalExpenseAmount} from '@utils/caculateExpense';

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
      const totalExpenseAmount = getTotalExpenseAmount(queryResult.data);
      updateTotalExpenseAmount(totalExpenseAmount);
    }
  }, [queryResult.data, queryResult.isSuccess, updateTotalExpenseAmount]);

  return queryResult;
};

export default useRequestGetStepList;
