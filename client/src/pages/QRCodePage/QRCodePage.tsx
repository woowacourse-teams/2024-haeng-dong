import {css} from '@emotion/react';

import {MainLayout, Top, TopNav} from '@components/Design';

const QRCodePage = () => {
  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
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
      <div>QR코드가 들어감</div>
      <div
        css={css`
          height: 9.25rem;
          content: ' ';
        `}
      />
    </MainLayout>
  );
};

export default QRCodePage;
