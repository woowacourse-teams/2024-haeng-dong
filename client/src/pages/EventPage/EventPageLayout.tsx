import type {Event} from 'types/serviceType';

import {Outlet} from 'react-router-dom';

import useEventPageLayout from '@hooks/useEventPageLayout';

import {ShareEventButton} from '@components/ShareEventButton';

import {MainLayout, TopNav, Switch} from '@HDesign/index';

export type EventPageContextProps = Event & {
  isAdmin: boolean;
};

const EventPageLayout = () => {
  const {navProps, isAdmin, isLoginPage, eventOutline} = useEventPageLayout();
  const {nav, paths, onChange} = navProps;

  const outletContext: EventPageContextProps = {
    isAdmin,
    ...eventOutline,
  };

  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <Switch value={nav} values={paths} onChange={onChange} />
        {!isLoginPage && <ShareEventButton eventOutline={eventOutline} />}
      </TopNav>
      <Outlet context={outletContext} />
    </MainLayout>
  );
};

export default EventPageLayout;
