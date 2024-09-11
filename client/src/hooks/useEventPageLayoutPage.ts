import {useMatch} from 'react-router-dom';

import {ROUTER_URLS} from '@constants/routerUrls';

import useRequestGetEventName from './queries/useRequestGetEventName';
import useNavSwitch from './useNavSwitch';

const useEventPageLayoutPage = () => {
  const navProps = useNavSwitch();
  const {data} = useRequestGetEventName();

  const eventName = data?.eventName ?? '';

  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;
  const isLoginPage = useMatch(ROUTER_URLS.eventLogin) !== null;

  return {
    navProps,
    isAdmin,
    eventName,
    isLoginPage,
  };
};

export default useEventPageLayoutPage;
