import {useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, Title, TopNav} from 'haengdong-design';

import {ROUTER_URLS} from '@constants/routerUrls';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <TopNav children={<></>} />
      <Title title="행동대장" description="랜딩페이지입니다." />
      <FixedButton onClick={() => navigate(ROUTER_URLS.eventCreateName)}>행사 생성하기</FixedButton>
    </MainLayout>
  );
};

export default MainPage;
