import {useAuthStore} from '@store/authStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestGetEvent from './queries/event/useRequestGetEvent';

const useEventPageLayout = () => {
  const eventId = getEventIdByUrl();
  const {eventName, bankName, accountNumber} = useRequestGetEvent();
  const {isAdmin} = useAuthStore();

  const event = {
    eventName,
    bankName,
    accountNumber,
  };

  return {
    eventId,
    isAdmin,
    event,
  };
};

export default useEventPageLayout;
