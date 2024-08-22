import {useLocation, useNavigate} from 'react-router-dom';
import {FixedButton, MainLayout, Title, TopNav} from 'haengdong-design';

import {ROUTER_URLS} from '@constants/routerUrls';

const CompleteCreateEventPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const eventId = params.get('eventId');

  return (
    <MainLayout backgroundColor="white">
      <TopNav />
      <Title
        title="행사 개시"
        description={`행사가 성공적으로 개시됐어요 :)
        관리 페이지로 이동해서 정산을 시작할 수 있어요`}
      />

      <FixedButton onClick={() => navigate(`${ROUTER_URLS.event}/${eventId}/admin`)}>관리 페이지로 이동</FixedButton>
    </MainLayout>
  );
};

export default CompleteCreateEventPage;
