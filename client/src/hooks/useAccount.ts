import {useEffect, useState} from 'react';

const useAccount = () => {
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const selectBank = (name: string) => {
    setBank(name);
  };

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(event.target.value);
  };

  const enrollAccount = () => {
    console.log('bank', bank, 'account', account);
  };

  useEffect(() => {
    setCanSubmit(bank !== '' && account !== '');
  }, [bank, account]);

  return {
    bank,
    account,
    canSubmit,
    selectBank,
    handleAccount,
    enrollAccount,
  };
};

export default useAccount;
