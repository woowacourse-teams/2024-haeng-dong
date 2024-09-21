import {useEffect} from 'react';

import toast from '@hooks/useToast/toast';

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

  useEffect(() => {
    if (!error) return;

    captureError(error);

    if (!isRequestError(error) || !isPredictableError(error)) throw error;

    toast.error(SERVER_ERROR_MESSAGES[error.errorCode], {
      showingTime: 3000,
      position: 'bottom',
      bottom: '8rem',
    });
  }, [error]);

  return children;
};

export default ErrorCatcher;
