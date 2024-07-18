import {useNavigate} from 'react-router-dom';
import {ROUTER_URLS} from '@constants/routerUrls';

const Main = () => {
  const navigate = useNavigate();

  return (
    <section>
      <h1>행동대장</h1>
      <button onClick={() => navigate(ROUTER_URLS.createEvent)}>행사 생성하기</button>
    </section>
  );
};

export default Main;
