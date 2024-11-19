import {css} from '@emotion/react';

import Top from '@components/Design/components/Top/Top';
import useSetEventNameStep from '@hooks/createEvent/useSetEventNameStep';
import {requestPostMemberEvent} from '@apis/request/event';
import useRequestPostMemberEvent from '@hooks/queries/event/useRequestPostMemberEvent';

import useAmplitude from '@hooks/useAmplitude';

import {FixedButton, Input} from '@HDesign/index';

type SetEventNamePageProps = {
  moveToNextStep: () => void;
  setEventToken: (eventToken: string) => void;
};

const SetMemberEventNameStep = ({moveToNextStep, setEventToken}: SetEventNamePageProps) => {
  const {eventName, errorMessage, canSubmit, handleEventNameChange} = useSetEventNameStep();
  const {postEvent, isPostEventPending} = useRequestPostMemberEvent();
  const {trackCompleteCreateMemberEvent} = useAmplitude();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await postEvent(eventName, {
      onSuccess: ({eventId}) => {
        trackCompleteCreateMemberEvent({eventName, eventToken: eventId});
        setEventToken(eventId);
      },
    });

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
      <form onSubmit={submit}>
        <Input
          labelText="행사 이름"
          errorText={errorMessage ?? ''}
          value={eventName}
          type="text"
          placeholder="행동대장 야유회"
          onChange={handleEventNameChange}
          isError={!!errorMessage}
          autoFocus
        />
        <FixedButton variants={isPostEventPending ? 'loading' : 'primary'} disabled={!canSubmit}>
          다음
        </FixedButton>
      </form>
    </div>
  );
};

export default SetMemberEventNameStep;
