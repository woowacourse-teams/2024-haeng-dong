import REGEXP from '@constants/regExp';
import {BillInfo} from '@pages/BillPage/AddBillFunnel';
import {useState} from 'react';
import {BillStep} from './useAddBillFunnel';

interface Props {
  billInfo: BillInfo;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
}

const useTitleStep = ({billInfo, setBillInfo, setStep}: Props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onTitleInputChange = (value: string) => {
    if (REGEXP.billTitle.test(value)) {
      setBillInfo(prev => ({...prev, title: value}));
    }
  };

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 12) {
      setErrorMessage('지출내역은 12자까지 입력 가능해요');
      onTitleInputChange(billInfo.title.slice(0, 12));
    } else {
      setErrorMessage('');
      onTitleInputChange(event.target.value);
    }
  };

  const canSubmitTitleInput = billInfo.title && !errorMessage;

  const handleTitleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === 'Enter' && canSubmitTitleInput) {
      event.preventDefault();
      setStep('members');
    }
  };

  const handleNextStep = () => {
    setStep('members');
  };

  const handlePrevStep = () => {
    setStep('price');
  };

  return {
    errorMessage,
    handleTitleInputChange,
    handleTitleInputEnter,
    canSubmitTitleInput,
    handleNextStep,
    handlePrevStep,
  };
};

export default useTitleStep;
