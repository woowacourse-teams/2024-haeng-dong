import {useCallback} from 'react';

import {BillInfo} from '@pages/BillPage/AddBillFunnel';

import {BillStep} from './useAddBillFunnel';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<BillStep>>;
  setBillInfo: React.Dispatch<React.SetStateAction<BillInfo>>;
}

const usePriceStep = ({setStep, setBillInfo}: Props) => {
  const handleNumberKeyboardChange = useCallback(
    (value: string) => {
      setBillInfo(prev => ({...prev, price: value}));
    },
    [setBillInfo],
  );

  const handleNextStep = () => {
    setStep('title');
  };

  return {handleNumberKeyboardChange, handleNextStep};
};

export default usePriceStep;
