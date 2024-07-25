import {Flex, MainLayout, TopNav, NavSwitch} from 'haengdong-design';
import {useLocation, useNavigate} from 'react-router-dom';

import {StepListProvider} from '@hooks/useStepList/useStepList';

import HomeContent from './HomeContent';

const HomeLayout = () => {
  const navigate = useNavigate();
  const basePath = location.pathname.split('/').slice(0, -1);

  const PATH_TABLE: Record<string, string> = {
    홈: 'home',
    관리: 'admin',
  };

  return (
    <StepListProvider>
      <MainLayout backgroundColor="gray">
        <TopNav>
          <NavSwitch
            paths={['홈', '관리']}
            defaultPath={'홈'}
            onChange={(value: string) => {
              navigate(PATH_TABLE[value]);
            }}
          />
        </TopNav>
        <Flex flexDirection="column" gap="1rem">
          <HomeContent />
        </Flex>
      </MainLayout>
    </StepListProvider>
  );
};

export default HomeLayout;
