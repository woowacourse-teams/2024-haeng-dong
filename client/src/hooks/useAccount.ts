import {useEffect, useState} from 'react';

import validateAccountNumber from '@utils/validate/validateAccountNumber';
import {BankAccount, BankName} from 'types/serviceType';

import RULE from '@constants/rule';
import REGEXP from '@constants/regExp';

type UseAccountArgs = {
  bankName: BankName;
  accountNumber: string;
  onSubmit: (args: Partial<BankAccount>) => Promise<void>;
};

const canEditAccountNumber = (newAccountNumber: string) => {
  return (
    newAccountNumber === '' ||
    (newAccountNumber.length <= RULE.maxAccountNumberLength && REGEXP.accountNumber.test(newAccountNumber))
  );
};

const useAccount = ({accountNumber: defaultAccountNumber, bankName: defaultBankName, onSubmit}: UseAccountArgs) => {
  const [bankName, setBankName] = useState<BankName>(defaultBankName);
  const [accountNumber, setAccountNumber] = useState<string>(defaultAccountNumber);

  const [accountNumberErrorMessage, setAccountNumberErrorMessage] = useState<string | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isPasting, setIsPasting] = useState(false);

  const selectBank = (name: BankName) => {
    setBankName(name);
  };

  const handleAccount = (newAccountNumber: string) => {
    const {errorMessage} = validateAccountNumber(newAccountNumber);
    setAccountNumberErrorMessage(errorMessage);

    const canEdit = canEditAccountNumber(newAccountNumber);

    if (canEdit) setAccountNumber(newAccountNumber);
  };

  const handleAccountOnTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPasting) return;

    const newAccountNumber = event.target.value;
    handleAccount(newAccountNumber);
  };

  const handleAccountOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    setIsPasting(true);

    const newAccountNumber = `${accountNumber}${event.clipboardData.getData('text')}`;
    handleAccount(newAccountNumber);

    setTimeout(() => setIsPasting(false), 0);
  };

  const enrollAccount = async () => {
    await onSubmit({bankName, accountNumber});
  };

  useEffect(() => {
    const areAllFieldsFilled = bankName.trim() !== '' && accountNumber.trim() !== '';
    const isChanged = bankName !== defaultBankName || accountNumber !== defaultAccountNumber;

    setCanSubmit(areAllFieldsFilled && isChanged && accountNumberErrorMessage === null);
  }, [bankName, accountNumber, accountNumberErrorMessage]);

  return {
    bankName,
    accountNumber,
    accountNumberErrorMessage,
    canSubmit,
    selectBank,
    handleAccount,
    handleAccountOnPaste,
    handleAccountOnTyping,
    enrollAccount,
  };
};

export default useAccount;
