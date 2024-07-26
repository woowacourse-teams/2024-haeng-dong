import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, Title, TopNav} from 'haengdong-design';

import {ROUTER_URLS} from '@constants/routerUrls';

const CompleteCreateEvent = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUrl = async () => {
      // TODO: (@weadie) eventId를 location에서 불러오는 로직 함수로 분리해서 재사용
      const params = new URLSearchParams(location.search);
      const eventId = params.get('eventId');

      // const url = await fetch();

      // TODO: (@weadie) eventId가 없는 경우에 대한 처리 필요
      setUrl(eventId ?? '');
    };

    getUrl();
  }, []);

  return (
    <MainLayout>
      <TopNav children={<></>} />
      <Title
        title="행사 개시"
        description="행사가 성공적으로 개시됐어요 :) 행사 링크를 통해서 참여자 관리가 가능해요. 관리를 위해서 행사 관리 링크를 보관해
        주세요."
      />
      <FixedButton onClick={() => navigate(`${ROUTER_URLS.event}/${url}/admin`)}>관리 페이지로 이동</FixedButton>
    </MainLayout>
  );
};

export default CompleteCreateEvent;
