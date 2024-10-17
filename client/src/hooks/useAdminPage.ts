import {useOutletContext} from 'react-router-dom';

import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import useRequestGetSteps from './queries/step/useRequestGetSteps';
import useBanner from './useBanner';

const useAdminPage = () => {
  const eventId = getEventIdByUrl();
  const {isAdmin, eventName, bankName, accountNumber} = useOutletContext<EventPageContextProps>();

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
    totalExpenseAmount,
    isShowAccountBanner,
    onDeleteAccount,
    steps,
    isShowDepositStateBanner,
    onDeleteDepositState,
  };
};

export default useAdminPage;
