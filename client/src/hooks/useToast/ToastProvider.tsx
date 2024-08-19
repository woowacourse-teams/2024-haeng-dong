/** @jsxImportSource @emotion/react */
import {createContext, useContext, useEffect, useState} from 'react';

import {useError} from '@hooks/useError/useError';

import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';

import {ToastProps} from '../../components/Toast/Toast.type';
import Toast from '../../components/Toast/Toast';

export const ToastContext = createContext<ToastContextProps | null>(null);

const DEFAULT_TIME = 3000;

interface ToastContextProps {
  showToast: (args: ShowToast) => void;
}

type ShowToast = ToastProps & {
  showingTime?: number;
  isAlwaysOn?: boolean;
};

export const ToastProvider = ({children}: React.PropsWithChildren) => {
  const [currentToast, setCurrentToast] = useState<ShowToast | null>(null);

  const showToast = ({showingTime = DEFAULT_TIME, isAlwaysOn = false, ...toastProps}: ShowToast) => {
    setCurrentToast({showingTime, isAlwaysOn, ...toastProps});
  };

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

    return;
  }, [currentToast]);

  return (
    <ToastContext.Provider value={{showToast}}>
      {currentToast && <Toast onClose={closeToast} {...currentToast} />}
      {children}
    </ToastContext.Provider>
  );
};
