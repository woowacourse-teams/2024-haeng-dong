import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {SendInfo} from './useReportsPage';

export type SendStep = 'whole' | 'copy' | 'toss' | 'kakaopay';

const useSendPage = () => {
  const [step, setStep] = useState<SendStep>('whole');
  const state = useLocation().state as SendInfo;

  useEffect(() => {
    if (!state) {
      throw new Error('비정상적인 접근');
    }
  }, [state]);

  const {bankName, accountNumber, amount} = state;

  const format = (accountNumber: string) => {
    if (accountNumber.length > 9) {
      return `${accountNumber.slice(0, 9)}...`;
    }
    return accountNumber;
  };

  const accountText = `${bankName} ${format(accountNumber)}으로`;
  const amountText = `${amount.toLocaleString('ko-kr')}원을 송금할게요`;

  const copyText = `${bankName} ${accountNumber} ${amount}원`;

  const onTossClick = () => {
    const tossUrl = `supertoss://send?amount=${amount}&bank=${bankName}&accountNo=${accountNumber}`;
    window.location.href = tossUrl;
  };

  const onKakaoPayClick = () => {
    const kakaoPayUrl = 'kakaotalk://kakaopay/home';
    window.location.href = kakaoPayUrl;
  };

  const changeStep = (step: SendStep) => {
    setStep(step);
  };

  return {
    accountText,
    amountText,
    copyText,
    onTossClick,
    onKakaoPayClick,
    step,
    changeStep,
  };
};

export default useSendPage;
