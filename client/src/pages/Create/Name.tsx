import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ROUTER_URLS} from '@constants/routerUrls';
import {FixedButton, Input, MainLayout, TextButton, Title, TopNav} from 'haengdong-design';

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const navigate = useNavigate();

  const submitEventTitle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`${ROUTER_URLS.eventCreateComplete}?${new URLSearchParams({title: eventTitle})}`);
  };

  return (
    <MainLayout>
      <TopNav navType="back" />
      <Title title="행사 이름 입력" description="시작할 행사 이름을 입력해 주세요." />
      <form onSubmit={submitEventTitle}>
        <Input
          value={eventTitle}
          onChange={event => setEventTitle(event.target.value)}
          placeholder="ex) 행동대장 야유회"
        />
        <FixedButton>행동 개시!</FixedButton>
      </form>
    </MainLayout>
  );
};

export default CreateEvent;
