import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {SendInfo} from './useReportsPage';
import toast from './useToast/toast';
import useAmplitude from './useAmplitude';

export type SendMethod = '복사하기' | '토스' | '카카오페이';
export type OnSend = () => void | Promise<void>;

const useSendPage = () => {
  const [sendMethod, setSendMethod] = useState<SendMethod>('토스');
  const state = useLocation().state as SendInfo;

  const {trackSendMoney} = useAmplitude();

  const options: SendMethod[] = ['토스', '카카오페이', '복사하기'];
  const defaultValue: SendMethod = '토스';

  const onSelect = (option: SendMethod) => {
    setSendMethod(option);
  };

  useEffect(() => {
    if (!state) {
      throw new Error('비정상적인 접근');
    }
  }, [state]);

  const {bankName, accountNumber, amount, eventName, eventToken} = state;

  const format = (accountNumber: string) => {
    if (accountNumber.length > 9) {
      return `${accountNumber.slice(0, 9)}...`;
    }
    return accountNumber;
  };

  const accountText = `${bankName} ${format(accountNumber)}으로`;
  const amountText = `${amount.toLocaleString('ko-kr')}원을 송금할게요`;

  const copyText = `${bankName} ${accountNumber} ${amount}원`;

  const onCopy = async () => {
    await window.navigator.clipboard.writeText(copyText);

    trackSendMoney({eventName, eventToken, amount, sendMethod: 'clipboard'});
    toast.confirm('금액이 복사되었어요.');
  };

  const onTossClick = () => {
    trackSendMoney({eventName, eventToken, amount, sendMethod: 'toss'});

    const tossUrl = `supertoss://send?amount=${amount}&bank=${bankName}&accountNo=${accountNumber}`;
    window.location.href = tossUrl;
  };

  const onKakaoPayClick = async () => {
    await window.navigator.clipboard.writeText(copyText);
    trackSendMoney({eventName, eventToken, amount, sendMethod: 'kakaopay'});

    const kakaoPayUrl = 'kakaotalk://kakaopay/home';
    window.location.href = kakaoPayUrl;
  };

  const buttonText: Record<SendMethod, string> = {
    복사하기: '복사하기',
    토스: '송금하기',
    카카오페이: '송금하기',
  };

  const sendMethodIntroduceText: Record<SendMethod, string> = {
    복사하기: '복사하기 버튼을 누른 뒤 원하는 방법으로 직접 송금해 주세요',
    토스: '',
    카카오페이: '카카오페이 앱으로 이동한 뒤 송금 버튼을 눌러주세요',
  };

  const buttonOnClick: Record<SendMethod, OnSend> = {
    복사하기: onCopy,
    토스: onTossClick,
    카카오페이: onKakaoPayClick,
  };

  const topMessage = {
    accountText,
    amountText,
  };

  const selectProps = {
    options,
    defaultValue,
    onSelect,
  };

  const selectResult = {
    sendMethod,
    buttonOnClick,
    buttonText,
    sendMethodIntroduceText,
  };

  return {
    topMessage,
    selectProps,
    selectResult,
  };
};

export default useSendPage;
