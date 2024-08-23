import {useContext} from 'react';

import {ToastContext} from './ToastProvider';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast는 ToastProvider 내에서 사용되어야 합니다.');
  }

  return context;
};
