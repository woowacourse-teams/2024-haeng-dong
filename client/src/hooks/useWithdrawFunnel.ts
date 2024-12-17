import {useEffect, useState} from 'react';

export type WithdrawStep =
  | 'withdrawReason'
  | 'notUseService'
  | 'unableToUseDueToError'
  | 'cantFigureOutHowToUseIt'
  | 'etc'
  | 'checkBeforeWithdrawing'
  | 'withdrawalCompleted';

const useWithdrawFunnel = () => {
  const [step, setStep] = useState<WithdrawStep>('withdrawReason');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleMoveStep = (nextStep: WithdrawStep) => setStep(nextStep);

  return {step, handleMoveStep};
};

export default useWithdrawFunnel;
