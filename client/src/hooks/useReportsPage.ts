import {useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import {ERROR_MESSAGE} from '@constants/errorMessage';

import {useSearchReports} from './useSearchReports';
import {useToast} from './useToast/useToast';

const useReportsPage = () => {
  const {showToast} = useToast();

  const [name, setName] = useState('');
  const {bankName, accountNumber} = useOutletContext<EventPageContextProps>();
  const {matchedReports, reports} = useSearchReports({name});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const onBankButtonClick = () => {
    if (bankName.trim() === '' || accountNumber.trim() === '') {
      showToast({
        showingTime: 3000,
        message: ERROR_MESSAGE.emptyBank,
        type: 'error',
        position: 'bottom',
        bottom: '8rem',
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
    matchedReports,
    expenseListProp,
    name,
    changeName,
  };
};

export default useReportsPage;
