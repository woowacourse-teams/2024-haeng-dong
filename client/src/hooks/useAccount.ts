import type {EventOutline} from 'types/serviceType';

import {useEffect, useState} from 'react';

import useRequestPatchEventOutline from './queries/useRequestPatchEventOutline';

type UseAccountProps = Omit<EventOutline, 'eventName'>;

const useAccount = ({bankName, accountNumber}: UseAccountProps) => {
  const [bankNameState, setBankName] = useState(bankName);
  const [accountNumberState, setAccountNumber] = useState(accountNumber);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setBankName(bankName);
    setAccountNumber(accountNumber);
  }, [bankName, accountNumber]);

  useEffect(() => {
    console.log(bankName, accountNumber);
  }, [bankName, accountNumber]);

  const {patchEventOutline} = useRequestPatchEventOutline();

  const selectBank = (name: string) => {
    setBankName(name);
  };

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(event.target.value);
  };

  const getChangedField = () => {
    const changedField: Partial<EventOutline> = {};

    if (typeof bankName !== 'undefined' && bankName !== bankNameState) {
      changedField.bankName = bankName;
    }

    if (typeof accountNumber !== 'undefined' && accountNumber !== accountNumberState) {
      changedField.accountNumber = accountNumber;
    }

    return changedField;
  };

  const enrollAccount = () => {
    patchEventOutline(getChangedField());
  };

  useEffect(() => {
    setCanSubmit(typeof bankName !== 'undefined' && typeof accountNumber !== 'undefined');
  }, [bankName, accountNumber]);

  return {
    bankName: bankNameState,
    accountNumber: accountNumberState,
    canSubmit,
    selectBank,
    handleAccount,
    enrollAccount,
  };
};

export default useAccount;
