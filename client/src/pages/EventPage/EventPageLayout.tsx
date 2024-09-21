import {Outlet} from 'react-router-dom';

import useEventPageLayout from '@hooks/useEventPageLayout';

import {ShareEventButton} from '@components/ShareEventButton';

import {MainLayout, TopNav, Switch} from '@HDesign/index';

export type EventPageContextProps = {
  isAdmin: boolean;
  eventName: string;
};

const EventPageLayout = () => {
  const {navProps, isAdmin, isLoginPage, eventName} = useEventPageLayout();
  const {nav, paths, onChange} = navProps;

  const outletContext: EventPageContextProps = {
    isAdmin,
    eventName,
  };

  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <Switch value={nav} values={paths} onChange={onChange} />
        {!isLoginPage && <ShareEventButton />}
      </TopNav>
      <Outlet context={outletContext} />
    </MainLayout>
  );
};

export default EventPageLayout;
