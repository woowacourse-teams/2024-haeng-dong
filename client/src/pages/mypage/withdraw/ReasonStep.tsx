import {css} from '@emotion/react';

import {WithdrawStep} from '@hooks/useWithdrawFunnel';

import {Top, Text} from '@components/Design';

import {stepButtonGroupStyle, stepButtonBoxStyle} from './ReasonStep.style';
import {IconChevron} from '@components/Design/components/Icons/Icons/IconChevron';

const ReasonStep = ({handleMoveStep}: {handleMoveStep: (nextStep: WithdrawStep) => void}) => {
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
          <Top.Line text="행동대장을" />
          <Top.Line text="탈퇴하는 이유가 무엇인가요?" emphasize={['탈퇴하는 이유']} />
        </Top>
        <div css={stepButtonGroupStyle}>
          <StepButton stepText="사용하지 않는 서비스에요" nextStep={() => handleMoveStep('notUseService')} />
          <StepButton stepText="오류가 생겨서 쓸 수 없어요" nextStep={() => handleMoveStep('unableToUseDueToError')} />
          <StepButton
            stepText="서비스 사용 방법을 모르겠어요"
            nextStep={() => handleMoveStep('cantFigureOutHowToUseIt')}
          />
          <StepButton stepText="기타" nextStep={() => handleMoveStep('etc')} />
        </div>
      </div>
    </>
  );
};

interface StepButtonProps {
  stepText: string;
  nextStep: () => void;
}

const StepButton = ({stepText, nextStep}: StepButtonProps) => {
  return (
    <div css={stepButtonBoxStyle} onClick={nextStep}>
      <Text size="bodyBold" textColor="onTertiary">
        {stepText}
      </Text>
      <IconChevron direction="right" size={12} />
    </div>
  );
};

export default ReasonStep;
