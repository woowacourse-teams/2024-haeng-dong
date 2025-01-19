import {css} from '@emotion/react';
import {QRCodeSVG} from 'qrcode.react';

import {MainLayout, Top, TopNav} from '@components/Design';
import {useTheme} from '@components/Design';

import getEventPageUrlByEnvironment from '@utils/getEventPageUrlByEnvironment';
import getEventIdByUrl from '@utils/getEventIdByUrl';

import {QRCodeStyle} from './QRCodePage.style';

const QRCodePage = () => {
  const {theme} = useTheme();
  const eventId = getEventIdByUrl();

  return (
    <MainLayout backgroundColor="white">
      <TopNav
        left={
          <TopNav.Text routePath="-1" isEmphasis={false}>
            뒤로가기
          </TopNav.Text>
        }
      ></TopNav>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Top.Line text="QR코드를 공유하여" emphasize={['QR코드']} />
          <Top.Line text="참여자를 초대해 보세요" />
        </Top>
      </div>
      <div css={QRCodeStyle()}>
        <QRCodeSVG value={getEventPageUrlByEnvironment(eventId, 'home')} size={240} fgColor={`${theme.colors.black}`} />
      </div>
    </MainLayout>
  );
};

export default QRCodePage;
