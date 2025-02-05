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
const useEventLoader = () => {
  const eventId = getEventIdByUrl();

  const {updateTotalExpenseAmount} = useTotalExpenseAmountStore();

  const queries = useSuspenseQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.event, eventId],
        queryFn: () => requestGetEvent({eventId}),
        initialData: {eventName: '', bankName: 'KB국민은행', accountNumber: '', createdByGuest: true},
        initialDataUpdatedAt: 0,
      },
      {
        queryKey: [QUERY_KEYS.reports, eventId],
        queryFn: () => requestGetReports({eventId}),
        initialData: {reports: []},
        initialDataUpdatedAt: 0,
      },
      {
        queryKey: [QUERY_KEYS.steps, eventId],
        queryFn: () => requestGetSteps({eventId}),
        initialData: [],
        initialDataUpdatedAt: 0,
      },
      {
        queryKey: [QUERY_KEYS.allMembers, eventId],
        queryFn: () => requestGetAllMembers({eventId}),
        initialData: {members: []},
        initialDataUpdatedAt: 0,
      },
    ],
  });

  const [eventData, reportsData, stepsData, membersData] = queries;
  const {data, isSuccess} = stepsData;

  const isFetching = queries.some(query => query.isFetching);

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
    steps: stepsData.data,
    reports: reportsData.data.reports,
    members: membersData.data.members,
    isFetching,
  };
};

export default useEventLoader;
