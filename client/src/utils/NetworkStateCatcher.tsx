import {useEffect} from 'react';

import toast from '@hooks/useToast/toast';

const NetworkStateCatcher = () => {
  const handleNetworkOnline = () => {
    // closeToast();
  };

  const handleNetworkOffline = () => {
    toast.error('네트워크 연결 상태를 확인해주세요.', {
      isAutoClosed: false,
      position: 'bottom',
      bottom: '6rem',
    });
  };

  const addNetworkStateEventListener = () => {
    window.addEventListener('online', handleNetworkOnline);
    window.addEventListener('offline', handleNetworkOffline);
  };

  const removeNetworkStateEventListener = () => {
    window.removeEventListener('online', handleNetworkOnline);
    window.removeEventListener('offline', handleNetworkOffline);
  };

  useEffect(() => {
    addNetworkStateEventListener();

    return removeNetworkStateEventListener;
  }, []);

  return null;
};

export default NetworkStateCatcher;
