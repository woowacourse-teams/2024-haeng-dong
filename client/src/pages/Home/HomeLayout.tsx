import {Flex, MainLayout} from 'haengdong-design';
import {StepListProvider} from '@hooks/useStepList/useStepList';
import {useEffect} from 'react';

import HomeContent from './HomeContent';

const HomeLayout = () => {
  useEffect(() => {}, []);

  return (
    <StepListProvider>
      <MainLayout backgroundColor="gray">
        {/* <TopNav navType="home" /> */}
        <Flex flexDirection="column" gap="1rem">
          <HomeContent />
        </Flex>
      </MainLayout>
    </StepListProvider>
  );
};

export default HomeLayout;
