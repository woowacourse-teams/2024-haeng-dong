import {useState} from 'react';
import {useOutletContext} from 'react-router-dom';

import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import {useSearchReports} from './useSearchReports';
import toast from './useToast/toast';

const useReportsPage = () => {
  const [memberName, setMemberName] = useState('');
  const {bankName, accountNumber} = useOutletContext<EventPageContextProps>();
  const {matchedReports, reports} = useSearchReports({memberName});

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setMemberName(target.value);
  };

  // 여기서 분기처리 다 해야 함
  const onSendButtonClick = (amount: number) => {
    const url = `supertoss://send?amount=${amount}&bank=${bankName}&accountNo=${accountNumber}`;
    window.location.href = url;
  };

  const onCopy = async (amount: number) => {
    await window.navigator.clipboard.writeText(`${amount.toLocaleString('ko-kr')}원`);
    toast.confirm('금액이 복사되었어요.');
  };

  const isEmpty = reports.length <= 0;
  const canSendBank = bankName !== '' && accountNumber !== '';

  const expenseListProp = matchedReports.map(member => ({
    ...member,
    canSendBank,
    onCopy,
    onSendButtonClick,
  }));

  return {
    isEmpty,
    expenseListProp,
    memberName,
    changeName,
  };
};

export default useReportsPage;
