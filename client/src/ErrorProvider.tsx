import ERROR_MESSAGES, {UNHANDLED_ERROR} from '@constants/errorMessage';
import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';

// 에러 컨텍스트 생성
interface ErrorContextType {
  hasError: boolean;
  errorMessage: string;
  setError: (error: ServerError) => void;
  clearError: (ms?: number) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// 에러 컨텍스트를 제공하는 프로바이더 컴포넌트
interface ErrorProviderProps {
  children: ReactNode;
  callback?: (message: string) => void;
}

export type ServerError = {
  errorCode: string;
  message: string;
};

export const ErrorProvider = ({children, callback}: ErrorProviderProps) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setErrorState] = useState<ServerError | null>(null);

  useEffect(() => {
    if (error) {
      if (isUnhandledError(error.errorCode)) {
        throw new Error(UNHANDLED_ERROR);
      }

      setHasError(true);
      const message = ERROR_MESSAGES[error.errorCode];
      setErrorMessage(message);
      // callback(message);
    }
  }, [error, callback]);

  const setError = (error: ServerError) => {
    setHasError(true);
    setErrorMessage('');
    setErrorState(error);
  };

  const clearError = (ms: number = 0) => {
    setTimeout(() => {
      setHasError(false);
      setErrorMessage('');
      setErrorState(null);
    }, ms);
  };

  return (
    <ErrorContext.Provider value={{hasError, errorMessage, setError, clearError}}>{children}</ErrorContext.Provider>
  );
};

// 에러 컨텍스트를 사용하는 커스텀 훅
export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

const isUnhandledError = (errorCode: string) => {
  if (errorCode === 'INTERNAL_SERVER_ERROR') return true;

  return ERROR_MESSAGES[errorCode] === undefined;
};
