import {useEffect, useState} from 'react';

import {Reports, Report, AllMembers, MemberWithDeposited} from 'types/serviceType';
import validateMemberName from '@utils/validate/validateMemberName';

import useRequestDeleteMember from './queries/member/useRequestDeleteMember';
import useRequestPutMembers from './queries/member/useRequestPutMembers';
import useRequestGetReports from './queries/report/useRequestGetReports';

interface ReturnUseEventMember {
  reports: Report[];
  isCanRequest: boolean;
  changeMemberName: (memberId: number, newName: string) => void;
  toggleDepositStatus: (memberId: number) => void;
  handleDeleteMember: (memberId: number) => void;
  updateMembersOnServer: () => void;
}

const useEventMember = (): ReturnUseEventMember => {
  const {reports: initialReports} = useRequestGetReports();
  const {deleteMember} = useRequestDeleteMember();
  const {putMember} = useRequestPutMembers();

  const [reports, setReports] = useState(initialReports);
  const [deleteMembers, setDeleteMembers] = useState<number[]>([]);
  const [changedMembers, setChangedMembers] = useState<MemberWithDeposited[]>([]);
  const [isCanRequest, setIsCanRequest] = useState<boolean>(false);
  const [filteredChangedMembers, setFilteredChangedMembers] = useState<MemberWithDeposited[]>([]);

  useEffect(() => {
    setReports(initialReports);
  }, [initialReports]);

  useEffect(() => {
    const changedMembers = getChangedMembers();

    if (changedMembers.length === 0) {
      setIsCanRequest(false);
    }
    setFilteredChangedMembers(changedMembers);
  }, [reports]);

  const changeMemberName = (memberId: number, newName: string) => {
    // 유효성 검사 (4글자)
    if (!validateMemberName(newName).isValid) {
      setIsCanRequest(false);
      return;
    }
    // 유효성 검사 (중복 이름)
    // const isExistingMemberName = reports.some(member => member.memberName === newName);

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

    setIsCanRequest(true);
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

    setIsCanRequest(true);
  };

  const handleDeleteMember = (memberId: number) => {
    setDeleteMembers(prev => [memberId, ...prev]);
    setReports(prevReports => prevReports.filter(report => report.memberId !== memberId));
    setChangedMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const getChangedMembers = () => {
    // 초기 상태에서 memberId를 키로 갖는 맵 생성
    const initialReportsMap = new Map(initialReports.map(report => [report.memberId, report]));

    // 변경된 값(changedMembers)에서 초기 상태와 동일한 값을 삭제
    const filteredChangedMembers = changedMembers.filter(changedMember => {
      const initialMember = initialReportsMap.get(changedMember.id);
      return (
        !initialMember ||
        initialMember.memberName !== changedMember.name ||
        initialMember.isDeposited !== changedMember.isDeposited
      );
    });

    return filteredChangedMembers;
  };

  const updateMembersOnServer = () => {
    // 삭제할 member(deleteMembers)가 존재한다면 Delete 요청 실행
    // if (deleteMembers.length > 0) {
    //   for (const id of deleteMembers) {
    //     deleteMember({memberId: id});
    //   }
    // }

    const filteredChangedMembers = getChangedMembers();
    console.log('reports:', reports);
    console.log('changedMembers:', changedMembers);
    console.log('filteredChangedMembers: ', filteredChangedMembers);

    // 변경된 값(filteredChangedMembers)이 존재한다면 PUT 요청 실행
    // if (filteredChangedMembers.length > 0) {
    //   putMember({members: filteredChangedMembers});
    // }
  };

  return {reports, isCanRequest, changeMemberName, handleDeleteMember, updateMembersOnServer, toggleDepositStatus};
};

export default useEventMember;
