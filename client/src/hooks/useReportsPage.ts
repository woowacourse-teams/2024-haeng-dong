import {useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import {ERROR_MESSAGE} from '@constants/errorMessage';

import {useSearchReports} from './useSearchReports';
import toast from './useToast/toast';

const useReportsPage = () => {
  const [name, setName] = useState('');
  const {bankName, accountNumber} = useOutletContext<EventPageContextProps>();
  const {matchedReports, reports} = useSearchReports({name});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const onBankButtonClick = () => {
    if (bankName.trim() === '' || accountNumber.trim() === '') {
      toast.error(ERROR_MESSAGE.emptyBank, {
        showingTime: 3000,
        position: 'bottom',
      });
      return;
    }

    const url = 'supertoss://';
    window.location.href = url;
  };

  const expenseListProp = matchedReports.map(member => ({
    ...member,
    clipboardText: `${bankName} ${accountNumber} ${member.price}원`,
    onBankButtonClick,
  }));

  const isEmpty = reports.length <= 0;

  return {
    isEmpty,
    expenseListProp,
    name,
    changeName,
  };
};

export default useReportsPage;
