import {MainLayout, TopNav, Switch} from 'haengdong-design';
import {Outlet, useMatch} from 'react-router-dom';
import {useState} from 'react';

import StepListProvider from '@hooks/useStepList/useStepList';

import useNavSwitch from '@hooks/useNavSwitch';

import {ROUTER_URLS} from '@constants/routerUrls';

export type EventPageContextProps = {
  isAdmin: boolean;
  order: number;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
};

const EventPageLayout = () => {
  const {nav, paths, onChange} = useNavSwitch();

  const [order, setOrder] = useState<number>(1);
  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;

  const outletContext: EventPageContextProps = {
    isAdmin,
    order,
    setOrder,
  };

  return (
    <StepListProvider>
      <MainLayout backgroundColor="gray">
        <TopNav>
          <Switch value={nav} values={paths} onChange={onChange} />
        </TopNav>
        <Outlet context={outletContext} />
      </MainLayout>
    </StepListProvider>
  );
};

export default EventPageLayout;
