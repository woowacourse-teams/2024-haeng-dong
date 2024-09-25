import {useEffect, useState, useCallback, useMemo} from 'react';

import {Report} from 'types/serviceType';
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

  useEffect(() => {
    setReports(initialReports);
  }, [initialReports]);

  const isCanRequest = useMemo(() => {
    // 중복되는 이름이 존재하는지 확인
    const hasDuplicateMemberName = (): boolean => {
      const nameCount: {[key: string]: number} = {};

      for (const member of reports) {
        if (nameCount[member.memberName]) {
          return true;
        }
        nameCount[member.memberName] = 1;
      }

      return false;
    };

    if (hasDuplicateMemberName()) {
      // 중복 이름이라면 false
      return false;
    }

    // 이름이 공백이라면 false
    const hasEmptyName = reports.some(report => report.memberName.trim().length === 0);
    if (hasEmptyName) return false;

    // 초기 값과 비교하여 변경된 사항이 존재하는지 확인
    const hasChanges = reports.some(report =>
      initialReports.find(
        initial =>
          initial.memberId === report.memberId &&
          (initial.memberName !== report.memberName || initial.isDeposited !== report.isDeposited),
      ),
    );

    // 변경된 사항이 존재 혹은 삭제된 member가 존재한다면 true
    return hasChanges || deleteMembers.length > 0;
  }, [reports, initialReports, deleteMembers]);

  const changeMemberName = useCallback((memberId: number, newName: string) => {
    // 유효성 검사 (4자 이하)
    if (!validateMemberName(newName).isValid) {
      return;
    }

    setReports(prevReports =>
      prevReports.map(report => (report.memberId === memberId ? {...report, memberName: newName} : report)),
    );
  }, []);

  const toggleDepositStatus = useCallback((memberId: number) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.memberId === memberId ? {...report, isDeposited: !report.isDeposited} : report,
      ),
    );
  }, []);

  // 삭제할 member를 따로 deleteMembers 상태에서 id만 저장
  const handleDeleteMember = useCallback((memberId: number) => {
    setDeleteMembers(prev => [memberId, ...prev]);
    // 삭제할 member들의 데이터를 reports에서 제거
    setReports(prevReports => prevReports.filter(report => report.memberId !== memberId));
  }, []);

  const updateMembersOnServer = useCallback(() => {
    // DELETE 요청 선행
    // deleteMembers에 값이 하나라도 전재하면 반복문을 통해 DELETE api 요청
    if (deleteMembers.length > 0) {
      for (const id of deleteMembers) {
        deleteMember({memberId: id});
      }
    }

    // DELETE 요청이 선행 된 후, PUT 요청 진행
    // 초기 reports와 비교하여 달라진 member 데이터만을 filter
    const changedMembers = reports
      .filter(report => {
        // 각 report와 동일한 초기 report 데이터를 찾기
        const initialReport = initialReports.find(initial => initial.memberId === report.memberId);

        // 초기 데이터와 비교했을 때, 변경사항이 발생한 것만을 filter
        return (
          initialReport &&
          (initialReport.memberName !== report.memberName || initialReport.isDeposited !== report.isDeposited)
        );
      })
      .map(report => ({
        // server로 요청할 때, price는 제외해야 하기 때문에 map 진행
        id: report.memberId,
        name: report.memberName,
        isDeposited: report.isDeposited,
      }));

    // 변경된 사항이 존재한다면 해당 reports만을 PUT api 요청
    if (changedMembers.length > 0) {
      putMember({members: changedMembers});
    }
  }, [deleteMembers, reports, initialReports, deleteMember, putMember]);

  return {reports, isCanRequest, changeMemberName, handleDeleteMember, updateMembersOnServer, toggleDepositStatus};
};

export default useEventMember;
