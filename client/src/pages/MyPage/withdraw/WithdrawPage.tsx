import useWithdrawFunnel from '@hooks/useWithdrawFunnel';

import {MainLayout, TopNav} from '@components/Design';

import ReasonStep from '@pages/mypage/withdraw/ReasonStep';
import NotUseServiceStep from '@pages/mypage/withdraw/NotUseServiceStep';
import EtcStep from '@pages/mypage/withdraw/EtcStep';
import CheckBeforeWithdrawingStep from '@pages/mypage/withdraw/CheckBeforeWithdrawingStep';
import WithdrawalCompleted from '@pages/mypage/withdraw/WithdrawalCompleted';
import UnableToUseDueToError from '@pages/mypage/withdraw/UnableToUseDueToError';

const WithdrawPage = () => {
  const {step, handleMoveStep} = useWithdrawFunnel();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      {step === 'withdrawReason' && <ReasonStep handleMoveStep={handleMoveStep} />}
      {step === 'notUseService' && <NotUseServiceStep handleMoveStep={handleMoveStep} />}
      {step === 'unableToUseDueToError' && <UnableToUseDueToError handleMoveStep={handleMoveStep} />}
      {step === 'etc' && <EtcStep handleMoveStep={handleMoveStep} />}
      {step === 'checkBeforeWithdrawing' && <CheckBeforeWithdrawingStep handleMoveStep={handleMoveStep} />}
      {step === 'withdrawalCompleted' && <WithdrawalCompleted />}
    </MainLayout>
  );
};

export default WithdrawPage;
