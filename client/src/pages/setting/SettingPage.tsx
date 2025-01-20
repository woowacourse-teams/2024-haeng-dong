import {ErrorBoundary} from '@sentry/react';
import {Suspense} from 'react';

import MyPageError from '@pages/fallback/MyPageError';
import MyPageLoading from '@pages/fallback/MyPageLoading';

import {FunnelLayout, MainLayout, TopNav} from '@components/Design';

const SettingPage = () => {
  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <ErrorBoundary fallback={<MyPageError />}>
          <Suspense fallback={<MyPageLoading />}>{/* section이 들어올 것 */}</Suspense>
        </ErrorBoundary>
      </FunnelLayout>
    </MainLayout>
  );
};

export default SettingPage;
