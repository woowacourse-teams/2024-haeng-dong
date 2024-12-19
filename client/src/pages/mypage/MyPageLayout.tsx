import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import MyPageLoading from '@pages/fallback/MyPageLoading';
import MyPageError from '@pages/fallback/MyPageError';

import {FunnelLayout, MainLayout, TopNav} from '@components/Design';

import Container from './Container';

type MyPageLayoutProps = {
  userInfoSection: React.ReactNode;
  settingSection: React.ReactNode;
};

const MyPageLayout = ({userInfoSection, settingSection}: MyPageLayoutProps) => {
  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <ErrorBoundary fallback={<MyPageError />}>
          <Suspense fallback={<MyPageLoading />}>
            <Container>{userInfoSection}</Container>
            <Container>{settingSection}</Container>
          </Suspense>
        </ErrorBoundary>
      </FunnelLayout>
    </MainLayout>
  );
};

export default MyPageLayout;
