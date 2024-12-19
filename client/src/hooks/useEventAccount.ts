import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import validateAccountNumber from '@utils/validate/validateAccountNumber';
import {BankAccount} from 'types/serviceType';

import getEventBaseUrl from '@utils/getEventBaseUrl';

import RULE from '@constants/rule';

import useRequestPatchEvent from './queries/event/useRequestPatchEvent';

const useEventAccount = () => {
  const location = useLocation();
  const locationState = location.state as BankAccount | null;

  const navigate = useNavigate();
  const [bankNameState, setBankName] = useState<string>();
  const [accountNumberState, setAccountNumber] = useState<string>();
  const [accountNumberErrorMessage, setAccountNumberErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isPasting, setIsPasting] = useState(false);

  useEffect(() => {
    if (locationState === null) {
      navigate(`${getEventBaseUrl(location.pathname)}/admin`);
    } else {
      setBankName(locationState.bankName);
      setAccountNumber(locationState.accountNumber);
    }
  }, [locationState]);

  const {patchEvent} = useRequestPatchEvent();

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

  const enrollAccount = async () => {
    await patchEvent({bankName: bankNameState, accountNumber: accountNumberState});
  };

  useEffect(() => {
    const existEmptyField = bankNameState?.trim() === '' || accountNumberState?.trim() === '';
    const isChanged = locationState?.bankName !== bankNameState || locationState?.accountNumber !== accountNumberState;

    setCanSubmit(!existEmptyField && isChanged && accountNumberErrorMessage === null);
  }, [locationState, bankNameState, accountNumberState, accountNumberErrorMessage]);

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

export default useEventAccount;
