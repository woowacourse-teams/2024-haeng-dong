import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestGetSteps from './queries/step/useRequestGetSteps';
import useBanner from './useBanner';
import useEventDataContext from './useEventDataContext';

const useAdminPage = () => {
  const eventId = getEventIdByUrl();
  const {isAdmin, bankName, accountNumber, eventName} = useEventDataContext();

  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {steps} = useRequestGetSteps();

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
