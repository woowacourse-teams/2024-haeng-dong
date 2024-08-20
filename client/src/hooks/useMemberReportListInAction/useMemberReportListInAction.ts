import type {MemberReportInAction} from 'types/serviceType';

import {useEffect, useState} from 'react';

import useRequestGetMemberReportListInAction from '@hooks/queries/useRequestGetMemberReportListInAction';
import useRequestPutMemberReportListInAction from '@hooks/queries/useRequestPutMemberReportListInAction';

const useMemberReportListInAction = (actionId: number, totalPrice: number) => {
  const {memberReportListInActionFromServer, queryResult} = useRequestGetMemberReportListInAction(actionId);
  const {putMemberReportListInAction} = useRequestPutMemberReportListInAction(actionId);

  const [memberReportListInAction, setMemberReportListInAction] = useState<MemberReportInAction[]>(
    memberReportListInActionFromServer,
  );

  useEffect(() => {
    if (queryResult.isSuccess) {
      setMemberReportListInAction(memberReportListInActionFromServer);
    }
  }, [memberReportListInActionFromServer, queryResult.isSuccess]);

  // 조정값 멤버의 수를 구하는 함수
  const getAdjustedMemberCount = (memberReportListInAction: MemberReportInAction[]) => {
    return memberReportListInAction.filter(member => member.isFixed === true).length;
  };

  const addAdjustedMember = (memberReport: MemberReportInAction) => {
    if (getAdjustedMemberCount(memberReportListInAction) + 1 >= memberReportListInAction.length) {
      return;
    }

    const newMemberReportListInAction = memberReportListInAction.map(member =>
      member.name === memberReport.name ? {...member, price: memberReport.price, isFixed: true} : member,
    );

    calculateAnotherMemberPrice(newMemberReportListInAction);
  };

  const calculateDividedPrice = (remainMemberCount: number, totalAdjustedPrice: number) => {
    // 조정되지 않은 멤버가 없거나 다 조정된 멤버라면
    if (remainMemberCount === 0 || remainMemberCount === memberReportListInAction.length) {
      return {
        divided: Math.floor(totalPrice / memberReportListInAction.length),
        remainder: (totalPrice - totalAdjustedPrice) % remainMemberCount,
      };
    }

    return {
      divided: Math.floor((totalPrice - totalAdjustedPrice) / remainMemberCount),
      remainder: (totalPrice - totalAdjustedPrice) % remainMemberCount,
    };
  };

  const calculateAnotherMemberPrice = (memberReportListInAction: MemberReportInAction[]) => {
    // 총 조정치 금액
    const totalAdjustedPrice = memberReportListInAction
      .filter(memberReport => memberReport.isFixed === true)
      .reduce((acc, cur) => acc + cur.price, 0);

    const remainMemberCount = memberReportListInAction.length - getAdjustedMemberCount(memberReportListInAction);
    const {divided, remainder} = calculateDividedPrice(remainMemberCount, totalAdjustedPrice);

    const updatedList = memberReportListInAction.map(member =>
      member.isFixed === true ? member : {...member, price: divided},
    );

    // 나머지를 조정되지 않은 멤버 중 마지막 멤버에게 추가
    if (remainder !== 0) {
      const nonAdjustedMembers = updatedList.filter(member => member.isFixed === false);
      const lastNonAdjustedMemberIndex = updatedList.findIndex(
        member => member.name === nonAdjustedMembers[nonAdjustedMembers.length - 1].name,
      );

      if (lastNonAdjustedMemberIndex !== -1) {
        updatedList[lastNonAdjustedMemberIndex].price += remainder;
      }
    }
    setMemberReportListInAction(updatedList);
  };

  const onSubmit = () => {
    putMemberReportListInAction(memberReportListInAction);
  };

  return {
    memberReportListInAction,
    addAdjustedMember,
    onSubmit,
    queryResult,
  };
};

export default useMemberReportListInAction;
