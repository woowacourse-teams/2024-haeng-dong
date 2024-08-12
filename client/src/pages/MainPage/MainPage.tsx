import {useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, Title, TopNav} from 'haengdong-design';

import {Logo} from '@components/Common/Logo';

import {ROUTER_URLS} from '@constants/routerUrls';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <TopNav children={<></>} />
      <Title title="행동대장" description="👑행동대장들의 행복한 행사 진행을 위해... 📢행동개시!" />
      <Logo />
      <FixedButton onClick={() => navigate(ROUTER_URLS.eventCreateName)}>행사 생성하기</FixedButton>
    </MainLayout>
  );
};

export default MainPage;
