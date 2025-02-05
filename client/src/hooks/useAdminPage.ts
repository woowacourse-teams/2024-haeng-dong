import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useBanner from './useBanner';
import useEventDataContext from './useEventDataContext';

const useAdminPage = () => {
  const eventId = getEventIdByUrl();
  const {isAdmin, bankName, accountNumber, eventName, createdByGuest, steps} = useEventDataContext();

  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {isShowAccountBanner, onDeleteAccount, isShowDepositStateBanner, onDeleteDepositState} = useBanner({
    eventId,
    bankName,
    accountNumber,
    steps,
  });

  return {
    eventId,
    isAdmin,
    eventName,
    bankName,
    createdByGuest,
    accountNumber,
    totalExpenseAmount,
    isShowAccountBanner,
    onDeleteAccount,
    steps,
    isShowDepositStateBanner,
    onDeleteDepositState,
  };
};

export default useAdminPage;
