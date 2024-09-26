import {useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import {isAndroid, isIOS} from '@utils/detectDevice';

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

  const onBankButtonClick = () => {
    if (bankName.trim() === '' || accountNumber.trim() === '') {
      toast.error(ERROR_MESSAGE.emptyBank, {
        showingTime: 3000,
        position: 'bottom',
      });
      return;
    }

    if (isAndroid()) {
      const url = 'supertoss://';
      window.location.href = url;
      return;
    }

    if (isIOS()) {
      const url = 'supertoss://send';
      window.location.href = url;
      return;
    }
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
    memberName,
    changeName,
  };
};

export default useReportsPage;
