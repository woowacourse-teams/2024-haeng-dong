import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestGetUserInfo from './queries/user/useRequestGetUserInfo';
import useEventDataContext from './useEventDataContext';

const useEventPageLayout = () => {
  const eventId = getEventIdByUrl();
  const {isAdmin, eventName, bankName, accountNumber, createdByGuest, steps, members} = useEventDataContext();
  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {userInfo} = useRequestGetUserInfo();
  const billsCount = steps.flatMap(step => [...step.bills]).length;

  const event = {
    eventName,
    bankName,
    accountNumber,
    createdByGuest,
    userInfo,
  };

  const eventSummary = {
    eventName,
    eventToken: eventId,
    totalExpenseAmount,
    allMembersCount: members.length,
    billsCount,
    isAdmin,
  };

  return {
    eventId,
    isAdmin,
    event,
    eventSummary,
  };
};

export default useEventPageLayout;
