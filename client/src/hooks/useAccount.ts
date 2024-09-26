import type {Event} from 'types/serviceType';

import {useEffect, useState} from 'react';

import validateAccountNumber from '@utils/validate/validateAccountNumber';

import RULE from '@constants/rule';

import useRequestPatchEvent from './queries/event/useRequestPatchEvent';
import useRequestGetEvent from './queries/event/useRequestGetEvent';

const useAccount = () => {
  const {bankName, accountNumber} = useRequestGetEvent();
  const [bankNameState, setBankName] = useState(bankName);
  const [accountNumberState, setAccountNumber] = useState(accountNumber);
  const [accountNumberErrorMessage, setAccountNumberErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isPasting, setIsPasting] = useState(false);

  useEffect(() => {
    setBankName(bankName);
    setAccountNumber(accountNumber);
  }, [bankName, accountNumber]);

  const {patchEventOutline} = useRequestPatchEvent();

  const selectBank = (name: string) => {
    setBankName(name);
  };

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPasting) return;

    const newValue = event.target.value;
    const {isValid, errorMessage} = validateAccountNumber(newValue);
    setAccountNumberErrorMessage(errorMessage);

    const isValidMinLength = newValue.length >= RULE.minAccountNumberLength;

    if (isValid) {
      setAccountNumber(event.target.value);
    } else if (!isValid && !isValidMinLength) {
      setAccountNumber(event.target.value.replace(/[^0-9\s\-]/g, '').trim());
    }
  };

  const handleAccountOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    setIsPasting(true);

    const value = `${accountNumberState}${event.clipboardData.getData('text')}`;
    const newValue = value.replace(/[^0-9\s\-]/g, '').trim();
    const {isValid, errorMessage} = validateAccountNumber(newValue);

    setAccountNumberErrorMessage(errorMessage);
    if (isValid) setAccountNumber(newValue);

    setTimeout(() => setIsPasting(false), 0);
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

    setCanSubmit(!existEmptyField && isChanged && accountNumberErrorMessage === null);
  }, [bankName, accountNumber, bankNameState, accountNumberState, accountNumberErrorMessage]);
  
  return {
    bankName: bankNameState,
    accountNumber: accountNumberState,
    accountNumberErrorMessage,
    canSubmit,
    selectBank,
    handleAccount,
    handleAccountOnPaste,
    enrollAccount,
  };
};

export default useAccount;
