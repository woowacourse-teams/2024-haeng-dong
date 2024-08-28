import type {MemberReportInAction} from 'types/serviceType';

import {useEffect, useState} from 'react';

import useRequestGetMemberReportListInAction from '@hooks/queries/useRequestGetMemberReportListInAction';
import useRequestPutMemberReportListInAction from '@hooks/queries/useRequestPutMemberReportListInAction';

const useMemberReportListInAction = (actionId: number, totalPrice: number, onClose: () => void) => {
  const {memberReportListInActionFromServer, queryResult} = useRequestGetMemberReportListInAction(actionId);
  const {putMemberReportListInAction} = useRequestPutMemberReportListInAction(actionId);

  const [memberReportListInAction, setMemberReportListInAction] = useState<MemberReportInAction[]>(
    memberReportListInActionFromServer,
  );

  // isFixed를 모두 풀고 계산값으로 모두 처리하는 기능
  const reCalculatePriceByTotalPriceChange = () => {
    const {divided, remainder} = calculateDividedPrice(memberReportListInAction.length, 0);

    const resetMemberReportList = [...memberReportListInAction];
    resetMemberReportList.forEach((member, index) => {
      if (index !== resetMemberReportList.length - 1) {
        member.price = divided;
      } else {
        member.price = divided + remainder;
      }
      member.isFixed = false;
    });

    setMemberReportListInAction(resetMemberReportList);
  };

  // 총 금액이 변동됐을 때 (서버에서 온 값과 다를 때) 재계산 실행
  useEffect(() => {
    const totalPriceFromServer = memberReportListInActionFromServer.reduce((acc, cur) => acc + cur.price, 0);

    if (totalPriceFromServer !== totalPrice && totalPriceFromServer !== 0) {
      reCalculatePriceByTotalPriceChange();
    }
  }, [totalPrice, memberReportListInActionFromServer]);

  useEffect(() => {
    if (queryResult.isSuccess) {
      setMemberReportListInAction(memberReportListInActionFromServer);
    }
  }, [memberReportListInActionFromServer, queryResult.isSuccess]);

  const isExistAdjustedPrice = () => {
    return memberReportListInAction.some(member => member.isFixed === true);
  };

  // 조정되지 않은 인원이 단 1명인 경우의 index
  const getOnlyOneNotAdjustedRemainMemberIndex = (): number | null => {
    const adjustedPriceCount = getAdjustedMemberCount(memberReportListInAction);

    if (adjustedPriceCount < memberReportListInAction.length - 1) return null;

    return memberReportListInAction.findIndex(member => member.isFixed === false);
  };

  // 조정값 멤버의 수를 구하는 함수
  const getAdjustedMemberCount = (memberReportListInAction: MemberReportInAction[]) => {
    return memberReportListInAction.filter(member => member.isFixed === true).length;
  };

  const addAdjustedMember = (memberReport: MemberReportInAction) => {
    const newMemberReportListInAction = memberReportListInAction.map(member =>
      member.name === memberReport.name ? {...member, price: memberReport.price, isFixed: true} : member,
    );

    calculateAnotherMemberPrice(newMemberReportListInAction);
  };

  const calculateDividedPrice = (remainMemberCount: number, totalAdjustedPrice: number) => {
    return {
      divided: Math.floor((totalPrice - totalAdjustedPrice) / remainMemberCount),
      remainder: (totalPrice - totalAdjustedPrice) % remainMemberCount,
    };
  };

  // 계산값으로 값을 변경했을 때 isFixed를 푸는 함수
  // 100 true 33300 true 33300 false 33300 false
  const setIsFixedFalseAtResetToDividedPrice = (memberReportListInAction: MemberReportInAction[], divided: number) => {
    return memberReportListInAction.map(memberReport => {
      if (memberReport.isFixed === true && memberReport.price === divided) {
        return {...memberReport, isFixed: false};
      }

      return memberReport;
    });
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

    // 조정됐지만 계산값으로 가격이 변한 경우 fixed 상태를 풀어야한다.
    const result = setIsFixedFalseAtResetToDividedPrice(updatedList, divided);
    setMemberReportListInAction(result);
  };

  const onSubmit = () => {
    putMemberReportListInAction(memberReportListInAction);

    onClose();
  };

  const getIsSamePriceStateAndServerState = () => {
    const serverStatePriceList = memberReportListInActionFromServer.map(({price}) => price);
    const clientStatePriceList = memberReportListInAction.map(({price}) => price);

    let isSame = true;

    // isArrayEqual을 사용하지 않은 이유는 정렬이 영향을 받으면 안 되기 때문입니다
    for (let i = 0; i < serverStatePriceList.length; i++) {
      if (serverStatePriceList[i] !== clientStatePriceList[i]) {
        isSame = false;
      }
    }

    return isSame;
  };

  return {
    memberReportListInAction,
    addAdjustedMember,
    isExistAdjustedPrice,
    onSubmit,
    getOnlyOneNotAdjustedRemainMemberIndex,
    getIsSamePriceStateAndServerState,
    queryResult,
  };
};

export default useMemberReportListInAction;
