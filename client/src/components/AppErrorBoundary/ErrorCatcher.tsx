import {useEffect} from 'react';

import FetchError from '@errors/FetchError';
import toast from '@hooks/useToast/toast';

import {useAppErrorStore} from '@store/appErrorStore';

import {captureError} from '@utils/captureError';

import {SERVER_ERROR_MESSAGES, UNKNOWN_ERROR} from '@constants/errorMessage';

export type ErrorInfo = {
  errorCode: string;
  message: string;
};

const convertAppErrorToErrorInfo = (appError: Error) => {
  if (appError instanceof Error) {
    const errorInfo =
      appError instanceof FetchError ? appError.errorInfo : {errorCode: appError.name, message: appError.message};

    return errorInfo;
  } else {
    const errorInfo = {errorCode: UNKNOWN_ERROR, message: JSON.stringify(appError)};

    return errorInfo;
  }
};

const isUnhandledError = (errorInfo: ErrorInfo) => {
  if (errorInfo.errorCode === 'INTERNAL_SERVER_ERROR') return true;

  return SERVER_ERROR_MESSAGES[errorInfo.errorCode] === undefined;
};

const ErrorCatcher = ({children}: React.PropsWithChildren) => {
  const {appError} = useAppErrorStore();

  useEffect(() => {
    if (appError) {
      const errorInfo = convertAppErrorToErrorInfo(appError);
      captureError(appError, errorInfo);

      if (!isUnhandledError(errorInfo)) {
        toast.error(SERVER_ERROR_MESSAGES[errorInfo.errorCode], {
          showingTime: 3000,
          position: 'bottom',
        });
      } else {
        throw appError;
      }
    }
  }, [appError]);

  return children;
};

export default ErrorCatcher;
