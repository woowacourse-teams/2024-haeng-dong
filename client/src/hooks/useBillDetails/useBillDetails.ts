import type {BillDetail} from 'types/serviceType';

import {useEffect, useState} from 'react';

import useRequestGetBillDetails from '@hooks/queries/bill/useRequestGetBillDetails';
import useRequestPutBillDetails from '@hooks/queries/bill/useRequestPutBillDetails';

const useBillDetails = (billId: number, totalPrice: number, onClose: () => void) => {
  const {billDetails: billDetailsFromServer, isSuccess} = useRequestGetBillDetails({billId});
  const {putBillDetails} = useRequestPutBillDetails({billId});

  const [billDetails, setBillDetails] = useState<BillDetail[]>(billDetailsFromServer);

  // isFixed를 모두 풀고 계산값으로 모두 처리하는 기능
  const reCalculatePriceByTotalPriceChange = () => {
    const {divided, remainder} = calculateDividedPrice(billDetails.length, 0);

    const resetBillDetails = [...billDetails];
    resetBillDetails.forEach((member, index) => {
      if (index !== resetBillDetails.length - 1) {
        member.price = divided;
      } else {
        member.price = divided + remainder;
      }
      member.isFixed = false;
    });

    setBillDetails(resetBillDetails);
  };

  // 총 금액이 변동됐을 때 (서버에서 온 값과 다를 때) 재계산 실행
  useEffect(() => {
    const totalPriceFromServer = billDetailsFromServer.reduce((acc, cur) => acc + cur.price, 0);

    if (totalPriceFromServer !== totalPrice && totalPriceFromServer !== 0) {
      reCalculatePriceByTotalPriceChange();
    }
  }, [totalPrice, billDetailsFromServer]);

  useEffect(() => {
    if (isSuccess) {
      setBillDetails(billDetailsFromServer);
    }
  }, [billDetailsFromServer, isSuccess]);

  const isExistAdjustedPrice = () => {
    return billDetails.some(member => member.isFixed === true);
  };

  // 조정되지 않은 인원이 단 1명인 경우의 index
  const getOnlyOneNotAdjustedRemainMemberIndex = (): number | null => {
    const adjustedPriceCount = getAdjustedMemberCount(billDetails);

    if (adjustedPriceCount < billDetails.length - 1) return null;

    return billDetails.findIndex(member => member.isFixed === false);
  };

  // 조정값 멤버의 수를 구하는 함수
  const getAdjustedMemberCount = (billDetails: BillDetail[]) => {
    return billDetails.filter(member => member.isFixed === true).length;
  };

  const addAdjustedMember = (memberReport: BillDetail) => {
    const newBillDetails = billDetails.map(member =>
      member.memberName === memberReport.memberName ? {...member, price: memberReport.price, isFixed: true} : member,
    );

    calculateAnotherMemberPrice(newBillDetails);
  };

  const calculateDividedPrice = (remainMemberCount: number, totalAdjustedPrice: number) => {
    return {
      divided: Math.floor((totalPrice - totalAdjustedPrice) / remainMemberCount),
      remainder: (totalPrice - totalAdjustedPrice) % remainMemberCount,
    };
  };

  // 계산값으로 값을 변경했을 때 isFixed를 푸는 함수
  // 100 true 33300 true 33300 false 33300 false
  const setIsFixedFalseAtResetToDividedPrice = (billDetails: BillDetail[], divided: number) => {
    return billDetails.map(bill => {
      if (bill.isFixed === true && bill.price === divided) {
        return {...bill, isFixed: false};
      }

      return bill;
    });
  };

  const calculateAnotherMemberPrice = (billDetails: BillDetail[]) => {
    // 총 조정치 금액
    const totalAdjustedPrice = billDetails
      .filter(memberReport => memberReport.isFixed === true)
      .reduce((acc, cur) => acc + cur.price, 0);

    const remainMemberCount = billDetails.length - getAdjustedMemberCount(billDetails);
    const {divided, remainder} = calculateDividedPrice(remainMemberCount, totalAdjustedPrice);

    const updatedList = billDetails.map(member => (member.isFixed === true ? member : {...member, price: divided}));

    // 나머지를 조정되지 않은 멤버 중 마지막 멤버에게 추가
    if (remainder !== 0) {
      const nonAdjustedMembers = updatedList.filter(member => member.isFixed === false);
      const lastNonAdjustedMemberIndex = updatedList.findIndex(
        member => member.memberName === nonAdjustedMembers[nonAdjustedMembers.length - 1].memberName,
      );

      if (lastNonAdjustedMemberIndex !== -1) {
        updatedList[lastNonAdjustedMemberIndex].price += remainder;
      }
    }

    // 조정됐지만 계산값으로 가격이 변한 경우 fixed 상태를 풀어야한다.
    const result = setIsFixedFalseAtResetToDividedPrice(updatedList, divided);
    setBillDetails(result);
  };

  const onSubmit = () => {
    const withoutMemberName = billDetails.map(billDetail => {
      const {memberName, ...rest} = billDetail;
      return {...rest};
    });

    putBillDetails({billId, billDetails: withoutMemberName});

    onClose();
  };

  const getIsSamePriceStateAndServerState = () => {
    const serverStatePriceList = billDetailsFromServer.map(({price}) => price);
    const clientStatePriceList = billDetails.map(({price}) => price);

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
    billDetails,
    addAdjustedMember,
    isExistAdjustedPrice,
    onSubmit,
    getOnlyOneNotAdjustedRemainMemberIndex,
    getIsSamePriceStateAndServerState,
    isSuccess,
  };
};

export default useBillDetails;
