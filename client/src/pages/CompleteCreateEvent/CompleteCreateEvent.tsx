import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {ROUTER_URLS} from '../../constants/routerUrls';

const CompleteCreateEvent = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUrl = async () => {
      const eventTitle = location.search;
      console.log(eventTitle);

      // const url = await fetch();
      setUrl('hangsapage');
    };

    getUrl();
  }, []);

  return (
    <section>
      <h1>행사 개시</h1>
      <h3>
        행사가 성공적으로 개시됐어요 :) 행사 링크를 통해서 참여자 관리가 가능해요. 관리를 위해서 행사 관리 링크를 보관해
        주세요.
      </h3>
      <button onClick={() => navigate(`${ROUTER_URLS.event}/${url}`)}>관리 페이지로 이동</button>
    </section>
  );
};

export default CompleteCreateEvent;
