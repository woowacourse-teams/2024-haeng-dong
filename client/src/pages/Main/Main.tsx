import {useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, Title, TopNav} from 'haengdong-design';

import {ROUTER_URLS} from '@constants/routerUrls';

const Main = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* <TopNav navType="back" /> */}
      <Title title="행동대장" description="랜딩페이지입니다. 뿌뿌 잠깐만 테스트해볼게요.." />
      <TopNav children={<></>} />
      <Title title="행동대장" description="랜딩페이지입니다." />
      <FixedButton onClick={() => navigate(ROUTER_URLS.eventCreateName)}>행사 생성하기</FixedButton>
    </MainLayout>
  );
};

export default Main;
