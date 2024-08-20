import type {MemberReportInAction} from 'types/serviceType';

import {useEffect, useState} from 'react';

import useRequestGetMemberReportListInAction from '@hooks/queries/useRequestGetMemberReportListInAction';
import useRequestPutMemberReportListInAction from '@hooks/queries/useRequestPutMemberReportListInAction';
import validateMemberReportInAction from '@utils/validate/validateMemberReportInAction';

import useInput from '@hooks/useInput';

const useMemberReportListInAction = (actionId: number, totalPrice: number) => {
  const {memberReportListInActionFromServer, queryResult} = useRequestGetMemberReportListInAction(actionId);
  const {putMemberReportListInAction} = useRequestPutMemberReportListInAction(actionId);

  const [memberReportListInAction, setMemberReportListInAction] = useState<MemberReportInAction[]>(
    memberReportListInActionFromServer,
  );

  const {inputList, canSubmit, handleChange} = useInput({
    validateFunc: validateMemberReportInAction,
    initialInputList: memberReportListInActionFromServer.map((member, index) => ({value: String(member.price), index})),
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const {value} = event.target;
    handleChange(index, value);
  };

  useEffect(() => {
    inputList.forEach(input => {
      const {index, value} = input;
      const targetMemberReport = memberReportListInActionFromServer[index];

      // 기존 값과 입력된 값이 다를 때만 addAdjustedMember 호출
      if (targetMemberReport && Number(value) !== targetMemberReport.price) {
        addAdjustedMember({
          ...targetMemberReport,
          price: Number(value),
        });
      }
    });
  }, [inputList]);

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
  };

  return {
    memberReportListInAction,
    addAdjustedMember,
    onSubmit,
    onChange,
    canSubmit,
    queryResult,
  };
};

export default useMemberReportListInAction;
