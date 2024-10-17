import {useEffect, useState} from 'react';

import {Step} from 'types/serviceType';

import SessionStorage from '@utils/SessionStorage';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

interface Props {
  eventId: string;
  bankName: string;
  accountNumber: string;
  steps: Step[];
}

const useBanner = ({eventId, bankName, accountNumber, steps}: Props) => {
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
    isShowAccountBanner,
    onDeleteAccount,
    isShowDepositStateBanner,
    onDeleteDepositState,
  };
};

export default useBanner;
