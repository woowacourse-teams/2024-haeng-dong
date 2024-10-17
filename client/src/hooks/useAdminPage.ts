import {useOutletContext} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import SessionStorage from '@utils/SessionStorage';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

import useRequestGetSteps from './queries/step/useRequestGetSteps';

const useAdminPage = () => {
  const eventId = getEventIdByUrl();
  const {isAdmin, eventName, bankName, accountNumber} = useOutletContext<EventPageContextProps>();

  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {steps} = useRequestGetSteps();

  // session storage에 배너를 지웠는지 관리
  const storageValue = SessionStorage.get<boolean>(SESSION_STORAGE_KEYS.closeAccountBannerByEventToken(eventId));
  const isClosed = storageValue !== null && storageValue === true;

  const [isShowBanner, setIsShowBanner] = useState<boolean>((bankName === '' || accountNumber === '') && !isClosed);

  useEffect(() => {
    setIsShowBanner((bankName === '' || accountNumber === '') && !isClosed);
  }, [bankName, accountNumber, isShowBanner]);

  const onDelete = () => {
    setIsShowBanner(false);
    SessionStorage.set<boolean>(SESSION_STORAGE_KEYS.closeAccountBannerByEventToken(eventId), true);
  };

  return {
    eventId,
    isAdmin,
    eventName,
    totalExpenseAmount,
    isShowBanner,
    onDelete,
    steps,
  };
};

export default useAdminPage;
