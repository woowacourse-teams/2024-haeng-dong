import {createContext, useState, useEffect, ReactNode} from 'react';

import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';

// 에러 컨텍스트 생성
export interface ErrorContextType {
  clientErrorMessage: string;
  setErrorInfo: (error: ErrorInfo) => void;
  clearError: (ms?: number) => void;
  errorInfo: ErrorInfo | null;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// 에러 컨텍스트를 제공하는 프로바이더 컴포넌트
interface ErrorProviderProps {
  children: ReactNode;
  callback?: (message: string) => void;
}

export type ErrorInfo = {
  errorCode: string;
  message: string;
};

export const ErrorProvider = ({children, callback}: ErrorProviderProps) => {
  const [clientErrorMessage, setClientErrorMessage] = useState('');
  const [errorInfo, setErrorState] = useState<ErrorInfo | null>(null);

  useEffect(() => {
    if (errorInfo) {
      if (isUnhandledError(errorInfo.errorCode)) {
        // 에러바운더리로 보내기

        throw errorInfo;
      }

      const message = SERVER_ERROR_MESSAGES[errorInfo.errorCode];
      setClientErrorMessage(message);
      // callback(message);
    }
  }, [errorInfo, callback]);

  const setErrorInfo = (error: ErrorInfo) => {
    setClientErrorMessage('');
    setErrorState(error);
  };

  const clearError = (ms: number = 0) => {
    if (errorInfo === null) return;

    setTimeout(() => {
      setClientErrorMessage('');
      setErrorState(null);
    }, ms);
  };

  return (
    <ErrorContext.Provider value={{errorInfo, clientErrorMessage, setErrorInfo, clearError}}>
      {children}
    </ErrorContext.Provider>
  );
};

const isUnhandledError = (errorCode: string) => {
  if (errorCode === 'INTERNAL_SERVER_ERROR') return true;

  return SERVER_ERROR_MESSAGES[errorCode] === undefined;
};
