import {useEffect, useState} from 'react';

import {MemberReport} from 'types/stepList';
import {requestMemberReportList} from '@apis/request/report';

import {WithEventId} from '@apis/withEventId.type';

import memberReportSearchJsonList from '@mocks/memberReportSearchList.json';

const memberReportSearchMockList = memberReportSearchJsonList as MemberReport[];

type UseSearchMemberReportListParams = {
  name: string;
};

const useSearchMemberReportList = ({name, eventId}: WithEventId<UseSearchMemberReportListParams>) => {
  const [memberReportList, setMemberReportList] = useState<MemberReport[]>(memberReportSearchMockList);
  const [memberReportSearchList, setMemberReportSearchList] = useState<MemberReport[]>([]);

  useEffect(() => {
    const fetchMemberReportList = async () => {
      // TODO: (@weadie) cors 고쳐지면 주석 풀게요.
      // const memberReportListData = await requestMemberReportList({eventId});

      const memberReportListData = memberReportSearchMockList;

      setMemberReportList(memberReportListData);
    };

    fetchMemberReportList();
  }, []);

  // TODO: (@weadie) 글자가 완성될 때마다 아래 로직이 실행되어야 합니다.
  useEffect(() => {
    if (name === '') setMemberReportSearchList(memberReportList);

    setMemberReportSearchList(memberReportList.filter(memberReport => memberReport.name.includes(name)));
  }, [name]);

  return {
    memberReportSearchList,
  };
};

export default useSearchMemberReportList;
