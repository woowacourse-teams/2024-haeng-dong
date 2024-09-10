import {Outlet} from 'react-router-dom';

import useEventPageLayoutPage from '@hooks/useEventPageLayoutPage';

import {MemberInviteButton} from '@components/MemberInviteButton';

import {MainLayout, TopNav, Switch} from '@HDesign/index';

export type EventPageContextProps = {
  isAdmin: boolean;
  eventName: string;
};

const EventPageLayout = () => {
  const {navProps, isAdmin, isLoginPage, eventName, shareText, onInviteButtonClick} = useEventPageLayoutPage();
  const {nav, paths, onChange} = navProps;

  const outletContext: EventPageContextProps = {
    isAdmin,
    eventName,
  };

  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <Switch value={nav} values={paths} onChange={onChange} />
        {!isLoginPage && <MemberInviteButton shareText={shareText} onInviteButtonClick={onInviteButtonClick} />}
      </TopNav>
      <Outlet context={outletContext} />
    </MainLayout>
  );
};

export default EventPageLayout;
