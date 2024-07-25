import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, Title} from 'haengdong-design';

import {ROUTER_URLS} from '@constants/routerUrls';

const CompleteCreateEvent = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUrl = async () => {
      const eventTitle = location.search;
      // console.log(eventTitle);

      // const url = await fetch();
      setUrl('hangsapage');
    };

    getUrl();
  }, []);

  return (
    <MainLayout>
      {/* <TopNav navType="back" /> */}
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
