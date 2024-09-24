import type {Event} from 'types/serviceType';

import {useEffect, useState} from 'react';

import useRequestPatchEvent from './queries/event/useRequestPatchEvent';
import useRequestGetEvent from './queries/event/useRequestGetEvent';

const useAccount = () => {
  const {bankName, accountNumber} = useRequestGetEvent();

  const [bankNameState, setBankName] = useState(bankName);
  const [accountNumberState, setAccountNumber] = useState(accountNumber);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setBankName(bankName);
    setAccountNumber(accountNumber);
  }, [bankName, accountNumber]);

  const {patchEventOutline} = useRequestPatchEvent();

  const selectBank = (name: string) => {
    setBankName(name);
  };

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(event.target.value);
  };

  const getChangedField = () => {
    const changedField: Partial<Event> = {};

    if (bankNameState.trim() !== '' && bankName !== bankNameState) {
      changedField.bankName = bankNameState;
    }

    if (accountNumberState.trim() !== '' && accountNumber !== accountNumberState) {
      changedField.accountNumber = accountNumberState;
    }

    return changedField;
  };

  const enrollAccount = async () => {
    await patchEventOutline(getChangedField());
  };

  useEffect(() => {
    const existEmptyField = bankNameState.trim() === '' || accountNumberState.trim() === '';
    const isChanged = bankName !== bankNameState || accountNumber !== accountNumberState;

    setCanSubmit(!existEmptyField && isChanged);
  }, [bankNameState, accountNumberState]);

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
