import {ErrorBoundary} from '@sentry/react';
import {Suspense} from 'react';
import {useNavigate} from 'react-router-dom';

import MyPageError from '@pages/fallback/MyPageError';
import MyPageLoading from '@pages/fallback/MyPageLoading';
import VStack from '@components/Design/components/Stack/VStack';

import {FunnelLayout, MainLayout, TopNav} from '@components/Design';
import {useTheme, Text, TextButton} from '@components/Design';

import {CategoryProps, TabList} from './SettingPage.type';

const accountCategory: TabList[] = [
  {name: '약관', url: 'd'},
  {name: '로그아웃', url: 'd'},
];

const Category = ({categoryTitle, tabList}: CategoryProps) => {
  const navigate = useNavigate();

  return (
    <VStack gap="16">
      <Text textColor="onTertiary" size="bodyBold">
        {categoryTitle}
      </Text>
      {tabList.map(tab => {
        return (
          <TextButton textColor="onTertiary" textSize="body" onClick={() => navigate(tab.url)}>
            {tab.name}
          </TextButton>
        );
      })}
    </VStack>
  );
};

const SettingSection = () => {
  const {theme} = useTheme();

  return (
    <VStack p="24" bg={`${theme.colors.white}`} br="12">
      <div>test</div>
      <Category categoryTitle="계정" tabList={accountCategory} />
    </VStack>
  );
};

const SettingPage = () => {
  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
      </TopNav>
      <FunnelLayout>
        <ErrorBoundary fallback={<MyPageError />}>
          <Suspense fallback={<MyPageLoading />}>
            <SettingSection />
          </Suspense>
        </ErrorBoundary>
      </FunnelLayout>
    </MainLayout>
  );
};

export default SettingPage;
