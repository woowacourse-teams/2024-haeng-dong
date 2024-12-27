import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestGetAllMembers from './queries/member/useRequestGetAllMembers';
import useRequestGetSteps from './queries/step/useRequestGetSteps';
import useRequestGetUserInfo from './queries/auth/useRequestGetUserInfo';
import useEventDataContext from './useEventDataContext';

const useEventPageLayout = () => {
  const eventId = getEventIdByUrl();
  const {isAdmin, eventName, bankName, accountNumber, createdByGuest} = useEventDataContext();
  const {totalExpenseAmount} = useTotalExpenseAmountStore();
  const {members} = useRequestGetAllMembers();
  const {steps} = useRequestGetSteps();
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
