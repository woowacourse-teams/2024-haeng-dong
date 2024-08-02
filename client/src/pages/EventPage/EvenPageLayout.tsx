import {MainLayout, TopNav, Switch} from 'haengdong-design';
import {Outlet} from 'react-router-dom';

import StepListProvider from '@hooks/useStepList/useStepList';

import useNavSwitch from '@hooks/useNavSwitch';

const EventPageLayout = () => {
  const {nav, paths, onChange} = useNavSwitch();

  return (
    <StepListProvider>
      <MainLayout backgroundColor="gray">
        <TopNav>
          <Switch value={nav} values={paths} onChange={onChange} />
        </TopNav>
        <Outlet />
      </MainLayout>
    </StepListProvider>
  );
};

export default EventPageLayout;
