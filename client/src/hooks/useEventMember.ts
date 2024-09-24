import {useEffect, useState} from 'react';

import {Reports, Report} from 'types/serviceType';

import useRequestDeleteMember from './queries/member/useRequestDeleteMember';
import useRequestPutMembers from './queries/member/useRequestPutMembers';
import useRequestGetReports from './queries/report/useRequestGetReports';

interface ReturnUseEventMember {
  reports: Report[];
  changeMemberName: (memberId: number, newName: string) => void;
}

const useEventMember = (): ReturnUseEventMember => {
  const {reports: initialReports} = useRequestGetReports();
  const {deleteMember} = useRequestDeleteMember();
  const {putMember} = useRequestPutMembers();

  const [reports, setReports] = useState(initialReports);

  useEffect(() => {
    setReports(initialReports);
  }, [initialReports]);

  const changeMemberName = (memberId: number, newName: string) => {
    setReports(prevReports => {
      const nameList = prevReports.map(report => report.memberName);

      // TODO: (@soha) 유효성 검사 추가 (4글자, 중복 이름)
      if (nameList.includes(newName)) return prevReports;

      return prevReports.map(report => (report.memberId === memberId ? {...report, memberName: newName} : report));
    });
  };

  const handleClickPutMembers = () => {
    // TODO: (@soha) PUT 요청 실행 전, Delete요청 실행
    // TODO: (@soha) 초기의 reports와 현재 reports가 변경된 사항이 존재한다면 PUT 요청 실행
  };

  return {reports, changeMemberName};
};

export default useEventMember;
