/** @jsxImportSource @emotion/react */
import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {ToastProps} from './Toast.type';
import Toast from './Toast';
import {useError} from '../../ErrorProvider';
import ERROR_MESSAGES from '@constants/errorMessage';

export const ToastContext = createContext<ToastContextProps | null>(null);

const DEFAULT_TIME = 3000;

interface ToastContextProps {
  showToast: (args: ShowToast) => void;
}

type ShowToast = ToastProps & {
  showingTime?: number;
  isAlwaysOn?: boolean;
};

const ToastProvider = ({children}: React.PropsWithChildren) => {
  const [currentToast, setCurrentToast] = useState<ShowToast | null>(null);
  const {hasError, errorMessage, clearError} = useError();

  const showToast = useCallback(({showingTime = DEFAULT_TIME, isAlwaysOn = false, ...toastProps}: ShowToast) => {
    setCurrentToast({showingTime, isAlwaysOn, ...toastProps});
  }, []);

  const closeToast = () => {
    setCurrentToast(null);
  };

  useEffect(() => {
    if (hasError) {
      showToast({
        message: errorMessage || ERROR_MESSAGES.UNHANDLED,
        showingTime: DEFAULT_TIME, // TODO: (@weadie) 나중에 토스트 프로바이더를 제거한 토스트를 만들 것이기 때문에 많이 리펙터링 안함
        isAlwaysOn: false,
        position: 'bottom',
        bottom: '100px',
      });

      clearError(DEFAULT_TIME);
    }
  }, [errorMessage, hasError]);

  useEffect(() => {
    if (!currentToast) return;

    if (!currentToast.isAlwaysOn) {
      const timer = setTimeout(() => {
        setCurrentToast(null);
      }, currentToast.showingTime);

      return () => clearTimeout(timer);
    }

    return;
  }, [currentToast]);

  return (
    <ToastContext.Provider value={{showToast}}>
      {currentToast && <Toast onClose={closeToast} {...currentToast} />}
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast는 ToastProvider 내에서 사용되어야 합니다.');
  }

  return context;
};

export {ToastProvider, useToast};
