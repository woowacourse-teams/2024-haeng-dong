import ReasonStep from '@pages/mypage/withdraw/ReasonStep';
import NotUseServiceStep from '@pages/mypage/withdraw/NotUseServiceStep';
import EtcStep from '@pages/mypage/withdraw/EtcStep';
import CheckBeforeWithdrawingStep from '@pages/mypage/withdraw/CheckBeforeWithdrawingStep';
import WithdrawalCompleted from '@pages/mypage/withdraw/WithdrawalCompleted';
import UnableToUseDueToError from '@pages/mypage/withdraw/UnableToUseDueToError';

import useWithdrawFunnel from '@hooks/useWithdrawFunnel';

import {MainLayout, TopNav} from '@components/Design';

const WithdrawPage = () => {
  const {step, handleMoveStep} = useWithdrawFunnel();

  return (
    <MainLayout backgroundColor="white">
      <TopNav
        left={
          <TopNav.Text routePath="-1" isEmphasis={false}>
            뒤로가기
          </TopNav.Text>
        }
      />
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
