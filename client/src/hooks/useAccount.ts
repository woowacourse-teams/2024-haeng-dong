import type {EventOutline} from 'types/serviceType';

import {useEffect, useState} from 'react';

import useRequestPatchEventOutline from './queries/useRequestPatchEventOutline';

type UseAccountProps = Omit<EventOutline, 'eventName'>;

const useAccount = (serverState: UseAccountProps) => {
  const [bankName, setBankName] = useState(serverState.bankName);
  const [accountNumber, setAccountNumber] = useState(serverState.accountNumber);
  const [canSubmit, setCanSubmit] = useState(false);

  const {patchEventOutline} = useRequestPatchEventOutline();

  const selectBank = (name: string) => {
    setBankName(name);
  };

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(event.target.value);
  };

  const getChangedField = () => {
    const changedField: Partial<EventOutline> = {};

    if (bankName !== null && bankName !== serverState.bankName) {
      changedField.bankName = bankName;
    }

    if (accountNumber !== null && accountNumber !== serverState.accountNumber) {
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
    bankName,
    accountNumber,
    canSubmit,
    selectBank,
    handleAccount,
    enrollAccount,
  };
};

export default useAccount;
