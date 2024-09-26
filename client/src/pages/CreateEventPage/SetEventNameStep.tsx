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
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    moveToNextStep();
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
      <form onSubmit={onSubmit}>
        <LabelInput
          labelText="행사 이름"
          errorText={errorMessage ?? ''}
          value={eventName}
          type="text"
          placeholder="행동대장 야유회"
          onChange={handleEventNameChange}
          isError={!!errorMessage}
          autoFocus
        />
        <FixedButton disabled={!canSubmit}>다음</FixedButton>
      </form>
    </div>
  );
};

export default SetEventNameStep;
