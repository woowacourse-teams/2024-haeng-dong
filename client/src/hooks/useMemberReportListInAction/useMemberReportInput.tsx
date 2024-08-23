import type {MemberReportInAction} from 'types/serviceType';

import {useEffect, useState} from 'react';

import validateMemberReportInAction from '@utils/validate/validateMemberReportInAction';

type MemberReportInput = MemberReportInAction & {
  index: number;
};

type UseMemberReportProps = {
  data: MemberReportInAction[];
  addAdjustedMember: (memberReport: MemberReportInAction) => void;
  getOnlyOneNotAdjustedRemainMemberIndex: () => number | null;
  getIsSamePriceStateAndServerState: () => boolean;
  totalPrice: number;
};

const useMemberReportInput = ({
  data,
  addAdjustedMember,
  totalPrice,
  getOnlyOneNotAdjustedRemainMemberIndex,
  getIsSamePriceStateAndServerState,
}: UseMemberReportProps) => {
  const [inputList, setInputList] = useState<MemberReportInput[]>(data.map((item, index) => ({...item, index})));
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const [canEditList, setCanEditList] = useState<boolean[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const {value} = event.target;

    validateAndAddAdjustedMember(value, index);
  };

  const validateAndAddAdjustedMember = (price: string, index: number) => {
    const {isValid} = validateMemberReportInAction(price, totalPrice);

    if (isValid) {
      const newInputList = [...inputList];
      newInputList[index].price = Number(price);
      setInputList(newInputList);

      const memberReportData: MemberReportInAction = {
        name: newInputList[index].name,
        price: newInputList[index].price,
        isFixed: newInputList[index].isFixed,
      };
      addAdjustedMember(memberReportData);
    }
  };

  // 서버와 값이 같지 않고 input price의 상태가 모두 valid하다면 can submit true
  useEffect(() => {
    const isSamePriceState = getIsSamePriceStateAndServerState();
    const isAllValid = inputList.every(input => validateMemberReportInAction(String(input.price), totalPrice));

    setCanSubmit(!isSamePriceState && isAllValid);
  }, [inputList]);

  // addAdjustedMember로 인해 data가 변했을 때 input list의 값을 맞춰주기 위함
  useEffect(() => {
    setCanSubmit(!getIsSamePriceStateAndServerState());
    setInputList(data.map((item, index) => ({...item, index})));

    // 남은 인원이 1명일 때 수정을 불가능하도록 설정
    const onlyOneIndex = getOnlyOneNotAdjustedRemainMemberIndex();

    if (data.length !== 0) {
      setCanEditList(new Array(data.length).fill(true));
    }

    if (onlyOneIndex !== null) {
      const newCanEditList = new Array(data.length).fill(true);
      newCanEditList[onlyOneIndex] = false;
      setCanEditList(newCanEditList);
    }
  }, [data]);

  return {
    inputList,
    onChange,
    canEditList,
    canSubmit,
  };
};

export default useMemberReportInput;
