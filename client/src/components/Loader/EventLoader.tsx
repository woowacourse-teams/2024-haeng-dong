import {useQueries} from '@tanstack/react-query';
import {useEffect} from 'react';

import {requestGetEvent} from '@apis/request/event';
import {requestGetReports} from '@apis/request/report';
import {requestGetSteps} from '@apis/request/step';
import {WithErrorHandlingStrategy} from '@errors/RequestGetError';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

const EventLoader = ({children, ...props}: React.PropsWithChildren<WithErrorHandlingStrategy | null> = {}) => {
  const eventId = getEventIdByUrl();

  const queries = useQueries({
    queries: [
      {queryKey: [QUERY_KEYS.event], queryFn: () => requestGetEvent({eventId, ...props})},
      {
        queryKey: [QUERY_KEYS.reports],
        queryFn: () => requestGetReports({eventId, ...props}),
      },
      {
        queryKey: [QUERY_KEYS.steps],
        queryFn: () => requestGetSteps({eventId, ...props}),
      },
    ],
  });

  const {updateTotalExpenseAmount} = useTotalExpenseAmountStore();

  useEffect(() => {
    if (queries[2].isSuccess && queries[2].data) {
      updateTotalExpenseAmount(queries[2].data);
    }
  }, [queries[2].data, queries[2].isSuccess, updateTotalExpenseAmount]);

  const isLoading = queries.some(query => query.isLoading === true);

  return !isLoading && children;
};

export default EventLoader;
