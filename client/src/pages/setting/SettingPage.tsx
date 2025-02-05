import {ErrorBoundary} from '@sentry/react';
import {Suspense} from 'react';
import {useNavigate} from 'react-router-dom';

import LoungePageLoading from '@pages/fallback/MainPageLoading';
import LoungePageError from '@pages/fallback/MainPageError';
import VStack from '@components/Design/components/Stack/VStack';
import {COLORS} from '@components/Design/token/colors';
import Box from '@components/Design/components/Box/Box';

import {FunnelLayout, MainLayout, TopNav} from '@components/Design';
import {Text, TextButton} from '@components/Design';

import {ROUTER_URLS} from '@constants/routerUrls';

import {CategoryProps, Tab, TabActions} from './SettingPage.type';

export const createAccountCategory = ({navigate}: TabActions): Tab[] => [
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

const Divider = () => <Box w="100%" h={1} bg={COLORS.grayContainer} />;

const SettingSection = () => {
  const navigate = useNavigate();
  const tabActions: TabActions = {navigate};

  return (
    <VStack p="24" bg={COLORS.white} br="12" gap="16" divider={<Divider />}>
      <Category categoryTitle="계정" tabList={createAccountCategory(tabActions)} />
      <Category categoryTitle="앱" tabList={createAppCategory()} />
    </VStack>
  );
};

const SettingPage = () => {
  return (
    <MainLayout backgroundColor="gray">
      <TopNav
        left={
          <TopNav.Text routePath="-1" isEmphasis={false}>
            뒤로가기
          </TopNav.Text>
        }
      />
      <FunnelLayout>
        <ErrorBoundary fallback={<LoungePageError />}>
          <Suspense fallback={<LoungePageLoading />}>
            <SettingSection />
          </Suspense>
        </ErrorBoundary>
      </FunnelLayout>
    </MainLayout>
  );
};

export default SettingPage;
