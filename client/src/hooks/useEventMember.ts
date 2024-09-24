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

  const [reports, setReports] = useState<Report[]>(initialReports);
  const [deleteMembers, setDeleteMembers] = useState<number[]>([]);
  const [changedMembers, setChangedMembers] = useState<MemberWithDeposited[]>([]);
  const [isCanRequest, setIsCanRequest] = useState<boolean>(false);
  const [filteredChangedMembers, setFilteredChangedMembers] = useState<MemberWithDeposited[]>([]);

  useEffect(() => {
    setReports(initialReports);
  }, [initialReports]);

  useEffect(() => {
    const changedMembers = getChangedMembers();

    // 중복된 이름이 존재할 경우 isCanRequest를 false로 변경
    if (hasDuplicateMemberName()) {
      setIsCanRequest(false);
    } else {
      // 변경된 사항이 존재하거나 삭제한 member가 존재한다면 isCanRequest를 true로 변경
      setIsCanRequest(changedMembers.length > 0 || deleteMembers.length > 0);
    }

    setFilteredChangedMembers(changedMembers);
  }, [reports, changedMembers, deleteMembers]);

  const changeMemberName = (memberId: number, newName: string) => {
    // 유효성 검사 (4글자)
    if (!validateMemberName(newName).isValid) {
      setIsCanRequest(false);
      return;
    }

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

  const updateMembersOnServer = () => {
    // 삭제할 member(deleteMembers)가 존재한다면 Delete 요청 실행
    if (deleteMembers.length > 0) {
      for (const id of deleteMembers) {
        deleteMember({memberId: id});
      }
    }

    console.log('reports:', reports);
    console.log('changedMembers:', changedMembers);
    console.log('filteredChangedMembers: ', filteredChangedMembers);

    // 변경된 값(filteredChangedMembers)이 존재한다면 PUT 요청 실행
    if (filteredChangedMembers.length > 0) {
      putMember({members: filteredChangedMembers});
    }
  };

  const getChangedMembers = () => {
    // 초기 상태에서 변경된 값이 존재하는 것만 filtering하여 return 한다.

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

  const hasDuplicateMemberName = (): boolean => {
    const nameCount: {[key: string]: number} = {};

    for (const member of reports) {
      if (nameCount[member.memberName]) {
        return true; // 중복된 이름이 존재하면 즉시 true 반환
      }
      nameCount[member.memberName] = 1;
    }

    return false; // 중복된 이름이 없으면 false 반환
  };

  return {reports, isCanRequest, changeMemberName, handleDeleteMember, updateMembersOnServer, toggleDepositStatus};
};

export default useEventMember;
