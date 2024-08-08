import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, FixedButton, Input, MainLayout, Text, Title, TopNav} from 'haengdong-design';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {css} from '@emotion/react';

import {useToast} from '@components/Toast/ToastProvider';

import {ROUTER_URLS} from '@constants/routerUrls';

const CompleteCreateEventPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const getUrl = async () => {
      // TODO: (@weadie) eventId를 location에서 불러오는 로직 함수로 분리해서 재사용
      const params = new URLSearchParams(location.search);
      const eventId = params.get('eventId');
      // TODO: (@weadie) eventId가 없는 경우에 대한 처리 필요
      setUrl(eventId ?? '');
    };

    getUrl();
  }, []);

  const {showToast} = useToast();

  return (
    <MainLayout>
      <TopNav children={<></>} />
      <Title title="행사 개시" description="행사가 성공적으로 개시됐어요 :)" />
      <div css={css({display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0 1rem'})}>
        <Text textColor="gray">행사 링크를 통해서 지출 내역 공유와 참여자 관리가 가능해요.</Text>
        <Text textColor="primary">관리를 위해서 행사 링크를 복사 후 보관해 주세요.</Text>
        <Input value={`haengdong.pro${ROUTER_URLS.event}/${url}/home`} disabled />

        <CopyToClipboard
          text={`haengdong.pro${ROUTER_URLS.event}/${url}/home`}
          onCopy={() =>
            showToast({
              showingTime: 3000,
              message: '링크가 복사되었어요 :) \n링크를 절대 분실하지 마세요!',
              type: 'confirm',
              position: 'top',
              top: '20px',
            })
          }
        >
          <Button size="large" variants="tertiary">
            행사 링크 복사하기
          </Button>
        </CopyToClipboard>
      </div>

      <FixedButton onClick={() => navigate(`${ROUTER_URLS.event}/${url}/admin`)}>관리 페이지로 이동</FixedButton>
    </MainLayout>
  );
};

export default CompleteCreateEventPage;
