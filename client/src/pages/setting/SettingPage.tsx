import {ErrorBoundary} from '@sentry/react';
import {Suspense} from 'react';
import {useNavigate} from 'react-router-dom';

import MyPageError from '@pages/fallback/MyPageError';
import MyPageLoading from '@pages/fallback/MyPageLoading';
import VStack from '@components/Design/components/Stack/VStack';

import {FunnelLayout, MainLayout, TopNav} from '@components/Design';
import {useTheme, Text, TextButton} from '@components/Design';

import {ROUTER_URLS} from '@constants/routerUrls';

import {CategoryProps, Tab, TabContext} from './SettingPage.type';

export const createAccountCategory = ({navigate}: TabContext): Tab[] => [
  {name: '약관', onClick: () => {}},
  {name: '로그아웃', onClick: () => {}},
  {name: '회원탈퇴', onClick: () => navigate(ROUTER_URLS.withdraw)},
];

export const createAppCategory = (): Tab[] => [{name: '서비스 버전', onClick: () => {}}];

const Category = ({categoryTitle, tabList}: CategoryProps) => (
  <VStack gap="16">
    <Text textColor="onTertiary" size="bodyBold">
      {categoryTitle}
    </Text>
    {tabList.map(tab => (
      <TextButton key={tab.name} textColor="onTertiary" textSize="body" onClick={tab.onClick}>
        {tab.name}
      </TextButton>
    ))}
  </VStack>
);

const SettingSection = () => {
  const {theme} = useTheme();
  const navigate = useNavigate();
  const tabContext: TabContext = {navigate};

  return (
    <VStack p="24" bg={`${theme.colors.white}`} br="12" gap="16">
      <Category categoryTitle="계정" tabList={createAccountCategory(tabContext)} />
      <Category categoryTitle="앱" tabList={createAppCategory()} />
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
