import {useState} from 'react';

const useAccount = () => {
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');

  const selectBank = (name: string) => {
    setBank(name);
  };

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(event.target.value);
  };

  const enrollAccount = () => {
    console.log('bank', bank, 'account', account);
  };

  return {
    bank,
    account,
    selectBank,
    handleAccount,
    enrollAccount,
  };
};

export default useAccount;
