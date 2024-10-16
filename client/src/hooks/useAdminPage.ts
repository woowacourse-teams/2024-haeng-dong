import {useOutletContext} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {EventPageContextProps} from '@pages/EventPage/EventPageLayout';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import SessionStorage from '@utils/SessionStorage';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

import useRequestGetSteps from './queries/step/useRequestGetSteps';
import useRequestPostAuthentication from './queries/auth/useRequestPostAuthentication';

const useAdminPage = () => {
  const eventId = getEventIdByUrl();
  const {isAdmin, eventName, bankName, accountNumber} = useOutletContext<EventPageContextProps>();

  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {steps} = useRequestGetSteps();
  const {postAuthenticate} = useRequestPostAuthentication();

  useEffect(() => {
    postAuthenticate();
  }, [postAuthenticate]);

  // session storage에 계좌번호 입력 배너를 지웠는지 관리
  const storageAccountValue = SessionStorage.get<boolean>(SESSION_STORAGE_KEYS.closeAccountBannerByEventToken(eventId));
  const isClosedAccount = storageAccountValue !== null && storageAccountValue === true;

  const isEmptyAccount = bankName === '' || accountNumber === '';
  const [isShowAccountBanner, setIsShowAccountBanner] = useState<boolean>(isEmptyAccount && !isClosedAccount);

  useEffect(() => {
    setIsShowAccountBanner(isEmptyAccount && !isClosedAccount);
  }, [bankName, accountNumber, isShowAccountBanner]);

  const onDeleteAccount = () => {
    setIsShowAccountBanner(false);
    SessionStorage.set<boolean>(SESSION_STORAGE_KEYS.closeAccountBannerByEventToken(eventId), true);
  };

  // session storage에 입금 상태관리 배너를 지웠는지 관리
  const storageDepositStateValue = SessionStorage.get<boolean>(
    SESSION_STORAGE_KEYS.closeDepositStateBannerByEventToken(eventId),
  );
  const isClosedDepositState = storageDepositStateValue != null && storageDepositStateValue;

  const isExistStepsAndAccount = steps.length && !isEmptyAccount;
  const [isShowDepositStateBanner, setIsShowDepositStateBanner] = useState<boolean>(
    !!isExistStepsAndAccount && !isClosedDepositState,
  );

  useEffect(() => {
    setIsShowDepositStateBanner(!!isExistStepsAndAccount && !isClosedDepositState);
  }, [isShowDepositStateBanner, steps, bankName, accountNumber]);

  const onDeleteDepositState = () => {
    setIsShowDepositStateBanner(false);
    SessionStorage.set<boolean>(SESSION_STORAGE_KEYS.closeDepositStateBannerByEventToken(eventId), true);
  };

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
