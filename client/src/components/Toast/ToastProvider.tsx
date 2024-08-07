/** @jsxImportSource @emotion/react */
import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {ToastProps} from './Toast.type';
import Toast from './Toast';
import {useError} from '../../ErrorProvider';

export const ToastContext = createContext<ToastContextProps | null>(null);

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

  const showToast = useCallback(({showingTime = 3000, isAlwaysOn = false, ...toastProps}: ShowToast) => {
    setCurrentToast({showingTime, isAlwaysOn, ...toastProps});
  }, []);

  const closeToast = () => {
    setCurrentToast(null);
  };

  useEffect(() => {
    if (hasError) {
      showToast({
        message: errorMessage || 'An error occurred',
        showingTime: 5000, // 필요에 따라 시간 설정
        isAlwaysOn: false,
        position: 'bottom',
        bottom: '100px',
      });

      const timer = setTimeout(() => {
        clearError();
      }, 5000); // 토스트가 표시되는 시간과 동일하게 설정

      return () => clearTimeout(timer);
    }

    return;
  }, [hasError, errorMessage, showToast, clearError]);

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
