import {useMatch} from 'react-router-dom';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

import useRequestGetEventOutline from './queries/useRequestGetEventOutline';
import useNavSwitch from './useNavSwitch';

const useEventPageLayout = () => {
  const navProps = useNavSwitch();
  const eventId = getEventIdByUrl();
  const eventOutline = useRequestGetEventOutline({eventId});

  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;
  const isLoginPage = useMatch(ROUTER_URLS.eventLogin) !== null;

  return {
    eventId,
    navProps,
    isAdmin,
    isLoginPage,
    eventOutline,
  };
};

export default useEventPageLayout;
