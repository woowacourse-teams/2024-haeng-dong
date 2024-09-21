import {useMatch} from 'react-router-dom';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

import useNavSwitch from './useNavSwitch';
import useRequestGetEvent from './queries/event/useRequestGetEvent';

const useEventPageLayout = () => {
  const navProps = useNavSwitch();
  const eventId = getEventIdByUrl();
  const {eventName, bankName, accountNumber} = useRequestGetEvent();

  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;
  const isLoginPage = useMatch(ROUTER_URLS.eventLogin) !== null;

  const eventOutline = {
    eventName,
    bankName,
    accountNumber,
  };

  return {
    eventId,
    navProps,
    isAdmin,
    isLoginPage,
    eventOutline,
  };
};

export default useEventPageLayout;
