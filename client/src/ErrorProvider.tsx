import ERROR_MESSAGES from '@constants/errorMessage';
import React, {createContext, useState, useContext, ReactNode} from 'react';

// 에러 컨텍스트 생성
interface ErrorContextType {
  hasError: boolean;
  errorMessage: string;
  setError: (error: Error) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// 에러 컨텍스트를 제공하는 프로바이더 컴포넌트
interface ErrorProviderProps {
  children: ReactNode;
}

type ServerError = {
  code: string;
  message: string;
};

export const ErrorProvider: React.FC<ErrorProviderProps> = ({children}) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setError = (error: ServerError) => {
    setHasError(false);
    setErrorMessage(ERROR_MESSAGES[error.code]);
    console.log(ERROR_MESSAGES[error.code]);
    setTimeout(() => {
      setHasError(true);
      setErrorMessage(error.message);
    }, 0); // 상태를 빠르게 변경하기 위해 타이머 사용
  };

  const clearError = () => {
    setHasError(false);
    setErrorMessage('');
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
