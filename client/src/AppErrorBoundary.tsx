import {ErrorBoundary} from 'react-error-boundary';

import ErrorPage from '@pages/ErrorPage/ErrorPage';
import {captureError} from '@utils/captureError';
import FetchError from '@errors/FetchError';
import {SERVER_ERROR_MESSAGES, UNKNOWN_ERROR} from '@constants/errorMessage';
import {useToast} from '@hooks/useToast/useToast';
import {useAppErrorStore} from '@store/appErrorStore';
import {useEffect, useState} from 'react';

interface ErrorFallbackProps {
  error: Error;
}

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

const AppErrorBoundary = ({children}: React.PropsWithChildren) => {
  const {appError} = useAppErrorStore();
  const {showToast} = useToast();

  useEffect(() => {
    if (appError) {
      captureError(appError instanceof FetchError ? appError : new Error(UNKNOWN_ERROR));
      const errorInfo = convertAppErrorToErrorInfo(appError);
      console.log(errorInfo);
      if (!isUnhandledError(errorInfo)) {
        showToast({
          showingTime: 3000,
          message: SERVER_ERROR_MESSAGES[errorInfo.errorCode],
          type: 'error',
          position: 'bottom',
          bottom: '8rem',
        });
      } else {
        showToast({
          showingTime: 3000,
          message: SERVER_ERROR_MESSAGES.UNHANDLED,
          type: 'error',
          position: 'bottom',
          bottom: '8rem',
        });
      }
    }
  }, [appError]);

  return <ErrorBoundary fallback={<ErrorPage />}>{children}</ErrorBoundary>;
};

export default AppErrorBoundary;
