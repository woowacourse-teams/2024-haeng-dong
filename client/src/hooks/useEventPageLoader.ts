import {useSuspenseQueries} from '@tanstack/react-query';
import {useEffect} from 'react';

import {requestGetEvent} from '@apis/request/event';
import {requestGetAllMembers} from '@apis/request/member';
import {requestGetReports} from '@apis/request/report';
import {requestGetSteps} from '@apis/request/step';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import QUERY_KEYS from '@constants/queryKeys';

/**
 * 이 훅이 하는 일:
 * 이벤트 정보 불러오기 + 총액 상태 계산하기
 */
const useEventPageLoader = () => {
  const eventId = getEventIdByUrl();

  const {updateTotalExpenseAmount} = useTotalExpenseAmountStore();

  const queries = useSuspenseQueries({
    queries: [
      {queryKey: [QUERY_KEYS.event], queryFn: () => requestGetEvent({eventId})},
      {
        queryKey: [QUERY_KEYS.reports],
        queryFn: () => requestGetReports({eventId}),
      },
      {
        queryKey: [QUERY_KEYS.steps],
        queryFn: () => requestGetSteps({eventId}),
      },
      {
        queryKey: [QUERY_KEYS.allMembers],
        queryFn: () => requestGetAllMembers({eventId}),
      },
    ],
  });

  const [eventData, reportsData, stepsData, membersData] = queries;
  const {data, isSuccess} = stepsData;

  useEffect(() => {
    if (isSuccess && data) {
      updateTotalExpenseAmount(data);
    }
  }, [data, isSuccess]);

  const {eventName, bankName, accountNumber, createdByGuest} = eventData.data;

  return {
    eventName,
    bankName,
    accountNumber,
    createdByGuest,
    eventToken: eventId,
  };
};

export default useEventPageLoader;
