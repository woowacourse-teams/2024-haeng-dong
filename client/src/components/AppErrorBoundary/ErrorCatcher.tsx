import {useEffect} from 'react';

import {useToast} from '@hooks/useToast/useToast';

import {useAppErrorStore} from '@store/appErrorStore';

import {captureError} from '@utils/captureError';
import isRequestError from '@utils/isRequestError';

import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';

const isPredictableError = (error: Error) => {
  if (isRequestError(error)) if (error.errorCode === 'INTERNAL_SERVER_ERROR') return false;

  return SERVER_ERROR_MESSAGES[error.name] !== undefined;
};

const ErrorCatcher = ({children}: React.PropsWithChildren) => {
  const {appError: error} = useAppErrorStore();
  const {showToast} = useToast();

  useEffect(() => {
    if (!error) return;

    captureError(error);

    console.log(isRequestError(error));
    console.log(isPredictableError(error));
    if (!isRequestError(error) || !isPredictableError(error)) throw error;

    showToast({
      showingTime: 3000,
      message: SERVER_ERROR_MESSAGES[error.errorCode],
      type: 'error',
      position: 'bottom',
      bottom: '8rem',
    });
  }, [error]);

  return children;
};

export default ErrorCatcher;
