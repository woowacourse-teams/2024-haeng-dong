import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import getEventBaseUrl from '@utils/getEventBaseUrl';

import {useSearchReports} from './useSearchReports';
import toast from './useToast/toast';
import useEventDataContext from './useEventDataContext';

export type SendInfo = {
  bankName: string;
  accountNumber: string;
  amount: number;
  eventName: string;
  eventToken: string;
};

const useReportsPage = () => {
  const [memberName, setMemberName] = useState('');
  const {eventName, eventToken, bankName, accountNumber} = useEventDataContext();
  const {matchedReports, reports} = useSearchReports({memberName});

  const location = useLocation();
  const navigate = useNavigate();

  const changeName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setMemberName(target.value);
  };

  const onSendButtonClick = (memberId: number, amount: number) => {
    const sendInfo: SendInfo = {
      bankName,
      accountNumber,
      amount,
      eventName,
      eventToken,
    };

    navigate(`/${getEventBaseUrl(location.pathname)}/home/send`, {state: sendInfo});
  };

  const onCopy = async (amount: number) => {
    await window.navigator.clipboard.writeText(`${amount.toLocaleString('ko-kr')}원`);
    toast.confirm('금액이 복사되었어요.');
  };

  const isEmpty = reports.length <= 0;
  const canSendBank = bankName !== '' && accountNumber !== '';

  const expenseListProp = matchedReports.map(report => ({
    ...report,
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
