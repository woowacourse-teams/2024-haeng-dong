import {css} from '@emotion/react';

import {WithdrawStep} from '@hooks/useWithdrawFunnel';

import {Top, Textarea, FixedButton, Flex} from '@components/Design';

const EtcStep = ({handleMoveStep}: {handleMoveStep: (nextStep: WithdrawStep) => void}) => {
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
          <Top.Line text="더 나은 행동대장이" emphasize={['더 나은 행동대장']} />
          <Top.Line text="될 수 있도록 의견을 들려주세요" emphasize={['의견']} />
        </Top>

        <Flex flexDirection="column" gap="1rem">
          <Textarea value={''} placeholder="내용을 입력해주세요." maxLength={300} height="275px" />
        </Flex>
      </div>
      <FixedButton
        onClick={() => handleMoveStep('checkBeforeWithdrawing')}
        onBackClick={() => handleMoveStep('withdrawReason')}
      >
        탈퇴하기
      </FixedButton>
    </>
  );
};

export default EtcStep;
