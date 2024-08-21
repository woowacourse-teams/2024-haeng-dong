import type {MemberReportInAction} from 'types/serviceType';

import {useEffect, useState} from 'react';

import validateMemberReportInAction from '@utils/validate/validateMemberReportInAction';

type MemberReportInput = MemberReportInAction & {
  index: number;
};

type UseMemberReportProps = {
  data: MemberReportInAction[];
  addAdjustedMember: (memberReport: MemberReportInAction) => void;
  totalPrice: number;
};

const useMemberReportInput = ({data, addAdjustedMember, totalPrice}: UseMemberReportProps) => {
  const [inputList, setInputList] = useState<MemberReportInput[]>(data.map((item, index) => ({...item, index})));
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const {value} = event.target;

    validateAndAddAdjustedMember(value, index);
  };

  const validateAndAddAdjustedMember = (price: string, index: number) => {
    const {isValid, errorMessage} = validateMemberReportInAction(price, totalPrice);
    setCanSubmit(errorMessage === null);

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

  // addAdjustedMember로 인해 data가 변했을 때 input list의 값을 맞춰주기 위함
  useEffect(() => {
    setInputList(data.map((item, index) => ({...item, index})));
  }, [data]);

  return {
    inputList,
    onChange,
    canSubmit,
  };
};

export default useMemberReportInput;
