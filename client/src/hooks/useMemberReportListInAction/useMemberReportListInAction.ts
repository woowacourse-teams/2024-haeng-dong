import {useEffect, useState} from 'react';

import useRequestGetMemberReportListInAction from '@hooks/queries/useRequestGetMemberReportListInAction';
import {MemberReport} from 'types/serviceType';
import useRequestPutMemberReportListInAction from '@hooks/queries/useRequestPutMemberReportListInAction';

const useMemberReportListInAction = (actionId: number, totalPrice: number) => {
  const {memberReportListInActionFromServer, queryResult} = useRequestGetMemberReportListInAction(actionId);
  const {putMemberReportListInAction} = useRequestPutMemberReportListInAction(actionId);

  const [memberReportListInAction, setMemberReportListInAction] = useState<MemberReport[]>(
    memberReportListInActionFromServer,
  );

  // 초기에 랜더링할 때 정상적으로 서버의 값을 클라이언트 상태에 set 한다.
  useEffect(() => {
    if (queryResult.isSuccess) {
      setMemberReportListInAction(memberReportListInActionFromServer);
    }
  }, [memberReportListInActionFromServer, queryResult.isSuccess]);

  // 가격이 조정된 멤버 리스트
  // 초기값은 어떻게 알지? 누가 조정된 가격인지 어떻게 파악하지?
  const [adjustedMemberList, setAdjustedMemberList] = useState<Set<string>>(new Set());

  // 조정값이 아닌 멤버의 수
  const remainMemberCount = memberReportListInAction.length - adjustedMemberList.size;

  const addAdjustedMember = (memberReport: MemberReport) => {
    if (adjustedMemberList.size + 1 >= memberReportListInAction.length) {
      return;
    }

    // 새 조정값을 반영하고
    setMemberReportListInAction(prevList =>
      prevList.map(member => (member.name === memberReport.name ? {...member, price: memberReport.price} : member)),
    );

    // 조정된 리스트에 추가한다.
    setAdjustedMemberList(prev => new Set(prev.add(memberReport.name)));
  };

  const calculateDividedPrice = (totalAdjustedPrice: number) => {
    // 남은 인원이 0일 때는 초기화
    if (remainMemberCount === 0) return totalPrice / memberReportListInAction.length;

    return (totalPrice - totalAdjustedPrice) / remainMemberCount;
  };

  const calculateAnotherMemberPrice = () => {
    // 총 조정치 금액
    const totalAdjustedPrice = memberReportListInAction
      .filter(memberReport => adjustedMemberList.has(memberReport.name))
      .reduce((acc, cur) => acc + cur.price, 0);

    const dividedPrice = calculateDividedPrice(totalAdjustedPrice);

    setMemberReportListInAction(prevList =>
      prevList.map(member => (adjustedMemberList.has(member.name) ? member : {...member, price: dividedPrice})),
    );
  };

  const onSubmit = () => {
    putMemberReportListInAction(memberReportListInAction);
  };

  useEffect(() => {
    calculateAnotherMemberPrice();
  }, [adjustedMemberList]);

  return {
    memberReportListInAction,
    addAdjustedMember,
    onSubmit,
    queryResult,
  };
};

export default useMemberReportListInAction;
