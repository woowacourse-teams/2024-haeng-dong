import {useNavigate} from 'react-router-dom';
import {css} from '@emotion/react';

import Top from '@components/Design/components/Top/Top';

import useSetEventNamePage from '@hooks/useSetEventNamePage';

import {FixedButton, MainLayout, LabelInput, TopNav, Back} from '@HDesign/index';

import {ROUTER_URLS} from '@constants/routerUrls';

const SetEventNamePage = () => {
  const navigate = useNavigate();
  const {eventName, errorMessage, canSubmit, handleEventNameChange} = useSetEventNamePage();

  const submitEventName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSuccessSubmint();
  };

  const onSuccessSubmint = () => {
    navigate(ROUTER_URLS.eventCreatePassword, {state: {eventName}});
  };

  const handleGoNextStep = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSuccessSubmint();
    }
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <Back />
      </TopNav>
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

        <form onSubmit={submitEventName}>
          <LabelInput
            labelText="행사 이름"
            errorText={errorMessage ?? ''}
            value={eventName}
            type="text"
            placeholder="행동대장 야유회"
            onChange={handleEventNameChange}
            isError={!!errorMessage}
            autoFocus
            onKeyDown={handleGoNextStep}
          ></LabelInput>
          <FixedButton disabled={!canSubmit}>다음</FixedButton>
        </form>
      </div>
    </MainLayout>
  );
};

export default SetEventNamePage;
