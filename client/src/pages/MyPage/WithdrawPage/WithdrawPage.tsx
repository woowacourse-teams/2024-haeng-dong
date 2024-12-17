import useWithdrawFunnel from '@hooks/useWithdrawFunnel';

import {MainLayout, TopNav} from '@components/Design';

import ReasonStep from './steps/ReasonStep';
import NotUseServiceStep from './steps/NotUseServiceStep';
import EtcStep from './steps/EtcStep';
import CheckBeforeWithdrawingStep from './steps/CheckBeforeWithdrawingStep';
import WithdrawalCompleted from './steps/WithdrawalCompleted';

const WithdrawPage = () => {
  const {step, handleMoveStep} = useWithdrawFunnel();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      {step === 'withdrawReason' && <ReasonStep handleMoveStep={handleMoveStep} />}
      {step === 'notUseService' && <NotUseServiceStep handleMoveStep={handleMoveStep} />}
      {step === 'etc' && <EtcStep handleMoveStep={handleMoveStep} />}
      {step === 'checkBeforeWithdrawing' && <CheckBeforeWithdrawingStep handleMoveStep={handleMoveStep} />}
      {step === 'withdrawalCompleted' && <WithdrawalCompleted />}
    </MainLayout>
  );
};

export default WithdrawPage;
