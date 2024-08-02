import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, LabelInput, Input, Title, TopNav, Back} from 'haengdong-design';

import {requestCreateNewEvent} from '@apis/request/event';
import validateEventName from '@utils/validate/validateEventName';

import {ROUTER_URLS} from '@constants/routerUrls';

const SetEventNamePage = () => {
  const [eventName, setEventName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const navigate = useNavigate();

  const submitEventName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await requestCreateNewEvent({eventName});

    if (response) {
      const {eventId} = response;
      navigate(`${ROUTER_URLS.eventCreateComplete}?${new URLSearchParams({eventId})}`);
    } else {
      // TODO: (@weadie)
      alert('오류님');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const validation = validateEventName(newValue);

    if (newValue.length === 0) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }

    if (validation.isValid) {
      console.log('!!');
      setEventName(newValue);
      setErrorMessage('');
    } else {
      event.target.value = eventName;
      setErrorMessage(validation.errorMessage ?? '');
    }
  };
  return (
    <MainLayout>
      <TopNav>
        <Back />
      </TopNav>
      <Title title="행사 이름 입력" description="시작할 행사 이름을 입력해 주세요." />
      <form onSubmit={submitEventName} style={{padding: '0 1rem'}}>
        {/* <LabelInput labelText="행사 이름" errorText={errorMessage}> */}
        <Input
          value={eventName}
          type="text"
          placeholder="행사 이름"
          onChange={e => handleChange(e)}
          isError={!!errorMessage}
          autoFocus
        />
        {/* </LabelInput> */}
        <FixedButton disabled={!canSubmit}>행동 개시!</FixedButton>
      </form>
    </MainLayout>
  );
};

export default SetEventNamePage;
