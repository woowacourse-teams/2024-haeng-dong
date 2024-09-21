import {useMatch} from 'react-router-dom';

import {ROUTER_URLS} from '@constants/routerUrls';

import useNavSwitch from './useNavSwitch';
import useRequestGetEvent from './queries/event/useRequestGetEvent';

const useEventPageLayout = () => {
  const navProps = useNavSwitch();
  const {eventName} = useRequestGetEvent();

  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;
  const isLoginPage = useMatch(ROUTER_URLS.eventLogin) !== null;

  return {
    navProps,
    isAdmin,
    eventName,
    isLoginPage,
  };
};

export default useEventPageLayout;
