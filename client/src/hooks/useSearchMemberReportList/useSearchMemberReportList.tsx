import type {MemberReport} from 'types/serviceType';

import {useEffect, useState} from 'react';

import {requestGetMemberReportList} from '@apis/request/report';
import useEventId from '@hooks/useEventId/useEventId';

import {useFetch} from '@apis/useFetch';

type UseSearchMemberReportListParams = {
  name: string;
};

const useSearchMemberReportList = ({name}: UseSearchMemberReportListParams) => {
  const [memberReportList, setMemberReportList] = useState<MemberReport[]>([]);
  const [memberReportSearchList, setMemberReportSearchList] = useState<MemberReport[]>([]);
  const {eventId} = useEventId();
  const {fetch} = useFetch();

  useEffect(() => {
    const fetchMemberReportList = async () => {
      // TODO: (@weadie) cors 고쳐지면 주석 풀게요.
      // TODO: (@weadie) eventId에 의존하는 두 개의 훅에 대한 리펙토링 필요
      if (eventId === '') return;

      const memberReportListData = await fetch({queryFunction: () => requestGetMemberReportList({eventId})});
      setMemberReportList(memberReportListData);
    };

    fetchMemberReportList();
  }, [eventId]);

  // TODO: (@weadie) 글자가 완성될 때마다 아래 로직이 실행되어야 합니다.
  useEffect(() => {
    if (name === '') setMemberReportSearchList(memberReportList);

    setMemberReportSearchList(memberReportList.filter(memberReport => memberReport.name.includes(name)));
  }, [name, memberReportList]);

  return {
    memberReportSearchList,
  };
};

export default useSearchMemberReportList;
