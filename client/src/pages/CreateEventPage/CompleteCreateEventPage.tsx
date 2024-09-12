import {useLocation, useNavigate} from 'react-router-dom';

import {RunningDog} from '@components/Common/Logo';

import {FixedButton, MainLayout, Title, TopNav} from '@HDesign/index';

import {ROUTER_URLS} from '@constants/routerUrls';
import Top from '@components/Design/components/Top/Top';
import {css} from '@emotion/react';

const CompleteCreateEventPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const eventId = params.get('eventId');

  return (
    <MainLayout backgroundColor="white">
      <TopNav />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Top.Line text="행사가 생성되었어요!" emphasize={['행사가 생성되었어요!']} />
          <Top.Line text="관리 페이지에서 정산을 시작하세요" emphasize={['정산을 시작하세요']} />
        </Top>
        <RunningDog />
      </div>
      <FixedButton onClick={() => navigate(`${ROUTER_URLS.event}/${eventId}/admin`)}>관리 페이지로 이동</FixedButton>
    </MainLayout>
  );
};

export default CompleteCreateEventPage;
