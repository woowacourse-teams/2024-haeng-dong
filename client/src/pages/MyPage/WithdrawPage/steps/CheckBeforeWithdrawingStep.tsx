import {css} from '@emotion/react';

import StandingDogLogo from '@components/Logo/StandingDogLogo';

import {WithdrawStep} from '@hooks/useWithdrawFunnel';

import {Top, FixedButton, Flex, Text} from '@components/Design';

const CheckBeforeWithdrawingStep = ({handleMoveStep}: {handleMoveStep: (nextStep: WithdrawStep) => void}) => {
  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Top.Line text="탈퇴하기 전에 확인해주세요" emphasize={['탈퇴하기 전에 확인해주세요']} />
        </Top>

        <Flex flexDirection="column" gap="0.5rem">
          <Text textColor="onTertiary">• 행동대장에서 관리했던 __님의 모든 개인정보를 다시 볼 수 없어요.</Text>
          <Text textColor="onTertiary">• 지난 행사 목록이 모두 사라져요.</Text>
          <Text textColor="onTertiary">• 개인 정보는 즉시 파기돼요.</Text>
        </Flex>
        <StandingDogLogo />
      </div>
      <FixedButton onClick={() => handleMoveStep('withdrawalCompleted')}>탈퇴하기</FixedButton>
    </>
  );
};

export default CheckBeforeWithdrawingStep;
