import {useEffect, useState} from 'react';

import {Reports, Report, AllMembers, MemberWithDeposited} from 'types/serviceType';

import useRequestDeleteMember from './queries/member/useRequestDeleteMember';
import useRequestPutMembers from './queries/member/useRequestPutMembers';
import useRequestGetReports from './queries/report/useRequestGetReports';

interface ReturnUseEventMember {
  reports: Report[];
  changeMemberName: (memberId: number, newName: string) => void;
  toggleDepositStatus: (memberId: number) => void;
  handleDeleteMember: (memberId: number) => void;
  handleClickPutMembers: () => void;
}

const useEventMember = (): ReturnUseEventMember => {
  const {reports: initialReports} = useRequestGetReports();
  const {deleteMember} = useRequestDeleteMember();
  const {putMember} = useRequestPutMembers();

  const [reports, setReports] = useState(initialReports);
  const [deleteMembers, setDeleteMembers] = useState<number[]>([]);
  const [changedMembers, setChangedMembers] = useState<MemberWithDeposited[]>([]);

  useEffect(() => {
    setReports(initialReports);
  }, [initialReports]);

  const changeMemberName = (memberId: number, newName: string) => {
    // TODO: (@soha) 유효성 검사 추가 (4글자, 중복 이름)
    setReports(prevReports =>
      prevReports.map(report => (report.memberId === memberId ? {...report, memberName: newName} : report)),
    );

    setChangedMembers(prev => {
      const existing = prev.find(member => member.id === memberId);
      const isDeposited = reports.find(report => report.memberId === memberId)?.isDeposited ?? false; // 기본값 제공

      if (existing) {
        return prev.map(member => (member.id === memberId ? {...member, name: newName, isDeposited} : member));
      }
      return [...prev, {id: memberId, name: newName, isDeposited}];
    });
  };

  const toggleDepositStatus = (memberId: number) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.memberId === memberId ? {...report, isDeposited: !report.isDeposited} : report,
      ),
    );

    setChangedMembers(prev => {
      const existing = prev.find(member => member.id === memberId);
      const name = reports.find(report => report.memberId === memberId)?.memberName ?? ''; // 기본값 제공
      const newIsDeposited = !reports.find(report => report.memberId === memberId)?.isDeposited ?? false;

      if (existing) {
        return prev.map(member => (member.id === memberId ? {...member, isDeposited: newIsDeposited} : member));
      }
      return [...prev, {id: memberId, name, isDeposited: newIsDeposited}];
    });
  };

  const handleDeleteMember = (memberId: number) => {
    setDeleteMembers(prev => [memberId, ...prev]);
    setReports(prevReports => prevReports.filter(report => report.memberId !== memberId));
    setChangedMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleClickPutMembers = () => {
    // 삭제할 member(deleteMembers)가 존재한다면 Delete 요청 실행
    if (deleteMembers.length > 0) {
      for (const id of deleteMembers) {
        return deleteMember({memberId: id});
      }
    }

    // TODO: (@soha) 초기의 값과 변경된 값이 동일하다면 해당 변경사항은 폐기

    // 변경된 값(changedMembers)이 존재한다면 PUT 요청 실행
    if (changedMembers.length > 0) {
      putMember({members: changedMembers});
    }
  };

  console.log('reports:', reports);
  console.log('changedMembers:', changedMembers);

  return {reports, changeMemberName, handleDeleteMember, handleClickPutMembers, toggleDepositStatus};
};

export default useEventMember;
