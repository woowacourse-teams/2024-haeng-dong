import {css} from '@emotion/react';

import Top from '@components/Design/components/Top/Top';

import {UseSetEventNameStepReturnType} from '@hooks/useSetEventNameStep';

import {FixedButton, Flex, LabelInput} from '@HDesign/index';

type SetEventNamePageProps = UseSetEventNameStepReturnType & {
  moveToNextStep: () => void;
};

const SetEventNameStep = ({
  eventName,
  moveToNextStep,
  errorMessage,
  handleEventNameChange,
  canSubmit,
}: SetEventNamePageProps) => {
  const moveToNextStepOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      moveToNextStep();
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      `}
    >
      <Top>
        <Top.Line text="정산을 시작하려는" />
        <Top.Line text="행사의 이름은 무엇인가요?" emphasize={['행사의 이름']} />
      </Top>
      <form onSubmit={moveToNextStep}>
        <LabelInput
          labelText="행사 이름"
          errorText={errorMessage ?? ''}
          value={eventName}
          type="text"
          placeholder="행동대장 야유회"
          onChange={handleEventNameChange}
          isError={!!errorMessage}
          autoFocus
          onKeyDown={moveToNextStepOnEnter}
        ></LabelInput>
        <FixedButton disabled={!canSubmit}>다음</FixedButton>
      </form>
    </div>
  );
};

export default SetEventNameStep;
