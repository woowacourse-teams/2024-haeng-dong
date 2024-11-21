import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import toast from '@hooks/useToast/toast';

import {useAppErrorStore} from '@store/appErrorStore';

import {captureError} from '@utils/captureError';
import isRequestError from '@utils/isRequestError';
import SessionStorage from '@utils/SessionStorage';

import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';
import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

const isPredictableError = (error: Error) => {
  if (isRequestError(error)) if (error.errorCode === 'INTERNAL_SERVER_ERROR') return false;

  return SERVER_ERROR_MESSAGES[error.name] !== undefined;
};

const ErrorCatcher = ({children}: React.PropsWithChildren) => {
  const {appError: error} = useAppErrorStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;

    captureError(error);

    if (!isRequestError(error) || !isPredictableError(error)) throw error;

    toast.error(SERVER_ERROR_MESSAGES[error.errorCode], {
      showingTime: 3000,
      position: 'bottom',
      bottom: '8rem',
    });

    // 로그인 처리
    if (error.errorCode === 'TOKEN_NOT_FOUND') {
      const createdByGuest = SessionStorage.get<boolean>(SESSION_STORAGE_KEYS.createdByGuest);
      SessionStorage.set<string>(SESSION_STORAGE_KEYS.previousUrlForLogin, window.location.href);

      const currentPath = window.location.pathname;

      if (createdByGuest) {
        navigate(`${currentPath}/guest/login`);
      } else {
        navigate(`${currentPath}/member/login`);
      }
    }
  }, [error, navigate]);

  return children;
};

export default ErrorCatcher;
