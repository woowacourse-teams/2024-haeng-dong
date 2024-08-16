import {useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, LabelInput, Title, TopNav, Back} from 'haengdong-design';

import useSetEventName from '@hooks/useSetEventName';

import {ROUTER_URLS} from '@constants/routerUrls';

const SetEventNamePage = () => {
  const navigate = useNavigate();
  const {eventName, errorMessage, canSubmit, handleEventNameChange} = useSetEventName();

  const submitEventName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(ROUTER_URLS.eventCreatePassword, {state: {eventName}, replace: true});
  };

  return (
    <MainLayout>
      <TopNav>
        <Back />
      </TopNav>
      <Title title="행사 이름 입력" description="시작할 행사 이름을 입력해 주세요." />
      <form onSubmit={submitEventName} style={{padding: '0 1rem'}}>
        <LabelInput
          labelText="행사 이름"
          errorText={errorMessage}
          value={eventName}
          type="text"
          placeholder="행사 이름"
          onChange={handleEventNameChange}
          isError={!!errorMessage}
          autoFocus
        ></LabelInput>
        <FixedButton disabled={!canSubmit}>다음</FixedButton>
      </form>
    </MainLayout>
  );
};

export default SetEventNamePage;
