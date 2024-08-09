import {MainLayout, TopNav, Switch} from 'haengdong-design';
import {Outlet, useMatch} from 'react-router-dom';

import StepListProvider from '@hooks/useStepList/useStepList';

import useNavSwitch from '@hooks/useNavSwitch';

import {ROUTER_URLS} from '@constants/routerUrls';

const EventPageLayout = () => {
  const {nav, paths, onChange} = useNavSwitch();
  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;

  return (
    <StepListProvider>
      <MainLayout backgroundColor="gray">
        <TopNav>
          <Switch value={nav} values={paths} onChange={onChange} />
        </TopNav>
        <Outlet context={isAdmin} />
      </MainLayout>
    </StepListProvider>
  );
};

export default EventPageLayout;
