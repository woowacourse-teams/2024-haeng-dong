import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {ROUTER_URLS} from '@constants/routerUrls';

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const navigate = useNavigate();

  const submitEventTitle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`${ROUTER_URLS.eventCreateName}?${new URLSearchParams({title: eventTitle})}`);
  };

  return (
    <section>
      <h1>행사 생성하기</h1>
      <h3>시작할 행사 이름을 입력해 주세요.</h3>
      <form onSubmit={submitEventTitle}>
        <input value={eventTitle} onChange={event => setEventTitle(event.target.value)} />
        <button>행동 개시!</button>
      </form>
    </section>
  );
};

export default CreateEvent;
