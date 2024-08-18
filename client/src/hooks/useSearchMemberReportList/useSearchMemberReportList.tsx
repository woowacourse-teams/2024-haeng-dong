import type {MemberReport} from 'types/serviceType';

import {useEffect, useState} from 'react';

import useRequestGetMemberReportList from '@hooks/useRequestGetMemberReportList';

type UseSearchMemberReportListParams = {
  name: string;
};

const useSearchMemberReportList = ({name}: UseSearchMemberReportListParams) => {
  const {data} = useRequestGetMemberReportList();
  const memberReportList = data ?? [];
  const [memberReportSearchList, setMemberReportSearchList] = useState<MemberReport[]>([]);

  // TODO: (@weadie) 글자가 완성될 때마다 아래 로직이 실행되어야 합니다.
  useEffect(() => {
    if (name === '') setMemberReportSearchList(memberReportList);

    setMemberReportSearchList(memberReportList.filter(memberReport => memberReport.name.includes(name)));
  }, [name, memberReportList]);

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
