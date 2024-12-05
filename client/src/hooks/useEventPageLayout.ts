import {useAuthStore} from '@store/authStore';
import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestGetEvent from './queries/event/useRequestGetEvent';
import useRequestGetAllMembers from './queries/member/useRequestGetAllMembers';
import useRequestGetSteps from './queries/step/useRequestGetSteps';

const useEventPageLayout = () => {
  const eventId = getEventIdByUrl();
  const {eventName, bankName, accountNumber, createdByGuest} = useRequestGetEvent();
  const {isAdmin} = useAuthStore();
  const {totalExpenseAmount} = useTotalExpenseAmountStore();
  const {members} = useRequestGetAllMembers();
  const {steps} = useRequestGetSteps();
  const billsCount = steps.flatMap(step => [...step.bills]).length;

  const event = {
    eventName,
    bankName,
    accountNumber,
    createdByGuest,
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
