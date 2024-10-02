import {useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import {ERROR_MESSAGE} from '@constants/errorMessage';

import {useSearchReports} from './useSearchReports';
import toast from './useToast/toast';

const useReportsPage = () => {
  const [memberName, setMemberName] = useState('');
  const {bankName, accountNumber} = useOutletContext<EventPageContextProps>();
  const {matchedReports, reports} = useSearchReports({memberName});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setMemberName(target.value);
  };

  const onBankButtonClick = (amount: number) => {
    if (bankName.trim() === '' || accountNumber.trim() === '') {
      toast.error(ERROR_MESSAGE.emptyBank, {
        showingTime: 3000,
        position: 'bottom',
      });
      return;
    }

    const url = `supertoss://send?amount=${amount}&bank=${bankName}&accountNo=${accountNumber}`;
    window.location.href = url;
  };

  const expenseListProp = matchedReports.map(member => ({
    ...member,
    onBankButtonClick,
  }));

  const isEmpty = reports.length <= 0;

  return {
    isEmpty,
    expenseListProp,
    memberName,
    changeName,
  };
};

export default useReportsPage;
