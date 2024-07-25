import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FixedButton, Input, MainLayout, Title, TopNav, Back} from 'haengdong-design';

import {requestCreateNewEvent} from '@apis/request/event';

import {ROUTER_URLS} from '@constants/routerUrls';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
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

  return (
    <MainLayout>
      <TopNav>
        <Back />
      </TopNav>
      <Title title="행사 이름 입력" description="시작할 행사 이름을 입력해 주세요." />
      <form onSubmit={submitEventName}>
        <Input
          value={eventName}
          onChange={event => setEventName(event.target.value)}
          placeholder="ex) 행동대장 야유회"
        />
        <FixedButton>행동 개시!</FixedButton>
      </form>
    </MainLayout>
  );
};

export default CreateEvent;
