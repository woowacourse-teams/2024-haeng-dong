import ReasonStep from '@pages/setting/withdraw/ReasonStep';
import NotUseServiceStep from '@pages/setting/withdraw/NotUseServiceStep';
import EtcStep from '@pages/setting/withdraw/EtcStep';
import CheckBeforeWithdrawingStep from '@pages/setting/withdraw/CheckBeforeWithdrawingStep';
import WithdrawalCompleted from '@pages/setting/withdraw/WithdrawalCompleted';
import UnableToUseDueToError from '@pages/setting/withdraw/UnableToUseDueToError';

import useWithdrawFunnel from '@hooks/useWithdrawFunnel';

import {MainLayout, TopNav} from '@components/Design';

const WithdrawPage = () => {
  const {step, handleMoveStep} = useWithdrawFunnel();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        {step !== 'withdrawalCompleted' && <TopNav.Item displayName={'뒤로가기'} noEmphasis routePath="-1" />}
      </TopNav>
      {/* TODO: (@soha) 탈퇴 사유를 입력받기 위한 step. 당장 사용하지 않으므로 주석. */}
      {/* {step === 'withdrawReason' && <ReasonStep handleMoveStep={handleMoveStep} />}
      {step === 'notUseService' && <NotUseServiceStep handleMoveStep={handleMoveStep} />}
      {step === 'unableToUseDueToError' && <UnableToUseDueToError handleMoveStep={handleMoveStep} />}
      {step === 'etc' && <EtcStep handleMoveStep={handleMoveStep} />} */}
      {step === 'checkBeforeWithdrawing' && <CheckBeforeWithdrawingStep handleMoveStep={handleMoveStep} />}
      {step === 'withdrawalCompleted' && <WithdrawalCompleted />}
    </MainLayout>
  );
};

export default WithdrawPage;
