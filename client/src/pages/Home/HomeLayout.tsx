import {Flex, MainLayout, TopNav} from 'haengdong-design';

import {StepListProvider} from '@hooks/useStepList/useStepList';

import HomeContent from './HomeContent';

const HomeLayout = () => {
  return (
    <StepListProvider>
      <MainLayout backgroundColor="gray">
        <TopNav navType="home" />
        <Flex flexDirection="column" gap="1rem">
          <HomeContent />
        </Flex>
      </MainLayout>
    </StepListProvider>
  );
};

export default HomeLayout;
