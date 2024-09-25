import type {Event} from 'types/serviceType';

import {Outlet} from 'react-router-dom';

import useEventPageLayout from '@hooks/useEventPageLayout';

import {ShareEventButton} from '@components/ShareEventButton';

import {Flex, Icon, IconButton, MainLayout, TopNav} from '@HDesign/index';

export type EventPageContextProps = Event & {
  isAdmin: boolean;
};

const EventPageLayout = () => {
  const {isAdmin, isLoginPage, eventOutline} = useEventPageLayout();

  const outletContext: EventPageContextProps = {
    isAdmin,
    ...eventOutline,
  };

  return (
    <MainLayout backgroundColor="gray">
      <Flex justifyContent="spaceBetween" alignItems="center" margin="0 1rem">
        <TopNav>
          <TopNav.Element routePath="-1">
            <IconButton variants="none">
              <Icon iconType="heundeut" />
            </IconButton>
          </TopNav.Element>
          <TopNav.Element displayName="홈" routePath="/home" />
          <TopNav.Element displayName="관리" routePath="/admin" />
        </TopNav>
        {!isLoginPage && <ShareEventButton eventOutline={eventOutline} />}
      </Flex>
      <Outlet context={outletContext} />
    </MainLayout>
  );
};

export default EventPageLayout;
