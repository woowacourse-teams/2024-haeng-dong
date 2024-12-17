import useWithdrawFunnel from '@hooks/useWithdrawFunnel';

import {MainLayout, TopNav} from '@components/Design';

import ReasonStep from './steps/ReasonStep';

const WithdrawPage = () => {
  const {step, handleMoveStep} = useWithdrawFunnel();

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      {step === 'withdrawReason' && <ReasonStep handleMoveStep={handleMoveStep} />}
    </MainLayout>
  );
};

export default WithdrawPage;
