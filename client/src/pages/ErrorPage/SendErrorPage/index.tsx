import {useNavigate} from 'react-router-dom';

import Top from '@components/Design/components/Top/Top';

import {Button, FunnelLayout, MainLayout} from '@HDesign/index';

const SendErrorPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout backgroundColor="white">
      <FunnelLayout>
        <Top>
          <Top.Line text="비정상적인 접근입니다." emphasize={['비정상적인 접근']} />
        </Top>
        <Button size="large" color="primary" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </FunnelLayout>
    </MainLayout>
  );
};

export default SendErrorPage;
