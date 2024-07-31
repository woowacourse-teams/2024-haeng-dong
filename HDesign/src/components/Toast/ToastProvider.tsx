/** @jsxImportSource @emotion/react */
import {createContext, useCallback, useContext, useEffect, useState} from 'react';

import {ToastProps} from './Toast.type';
import Toast from './Toast';

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

  const showToast = useCallback(({showingTime = 3000, isAlwaysOn = false, ...toastProps}: ShowToast) => {
    setCurrentToast({showingTime, isAlwaysOn, ...toastProps});
  }, []);

  const closeToast = () => {
    setCurrentToast(null);
  };

  useEffect(() => {
    if (!currentToast) return;

    if (!currentToast.isAlwaysOn) {
      const timer = setTimeout(() => {
        setCurrentToast(null);
      }, currentToast.showingTime);

      return () => clearTimeout(timer);
    }
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
