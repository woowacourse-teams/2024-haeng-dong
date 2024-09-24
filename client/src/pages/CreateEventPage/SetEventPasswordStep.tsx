import {css} from '@emotion/react';

import Top from '@components/Design/components/Top/Top';

import useSetEventPasswordStep, {UseSetEventPasswordStepReturnType} from '@hooks/useSetEventPasswordStep';

import {FixedButton, LabelInput} from '@HDesign/index';

import RULE from '@constants/rule';

type SetEventPasswordPageProps = {
  eventName: string;
  moveToNextStep: () => void;
  setEventToken: (eventToken: string) => void;
};

const SetEventPasswordStep = ({eventName, moveToNextStep, setEventToken}: SetEventPasswordPageProps) => {
  const {submitDataForPostEvent, errorMessage, password, handleChange, isPostEventPending, canSubmit} =
    useSetEventPasswordStep();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    await submitDataForPostEvent({event, eventName, setEventToken});

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
        <Top.Line text="관리에 필요한 네자리 숫자" emphasize={['네자리 숫자']} />
        <Top.Line text="비밀번호는 무엇으로 할까요?" emphasize={['비밀번호']} />
      </Top>
      <form onSubmit={submit}>
        <LabelInput
          labelText="비밀번호"
          errorText={errorMessage}
          value={password}
          type="text"
          maxLength={RULE.maxEventPasswordLength}
          placeholder="1234"
          onChange={handleChange}
          isError={!!errorMessage}
          autoFocus
        />
        {/* 가상 키패드 적용 예정 */}
        <FixedButton type="submit" variants={isPostEventPending ? 'loading' : 'primary'} disabled={!canSubmit}>
          행동 개시!
        </FixedButton>
      </form>
    </div>
  );
};

export default SetEventPasswordStep;
