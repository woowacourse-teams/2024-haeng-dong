import {useEffect, useState} from 'react';

import {isIOS, isMobileDevice} from '@utils/detectDevice';

import toast from './useToast/toast';

type NavigateAppArgs = {
  androidAppScheme: string;
  iosAppScheme: string;
};

const DEFAULT_INSTALL_THRESHOLD_TIME = 2500;

const useNavigateApp = (installThresholdTime?: number) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time === 0) return;

    const timeoutId = setTimeout(() => {
      if (
        Date.now() - time >= (installThresholdTime ?? DEFAULT_INSTALL_THRESHOLD_TIME) &&
        document.visibilityState === 'visible'
      ) {
        toast.error('앱이 설치되지 않았어요. 다른 앱을 사용해주세요.');
      }
    }, installThresholdTime ?? DEFAULT_INSTALL_THRESHOLD_TIME);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);

  useEffect(() => {
    const clearTime = () => {
      if (document.visibilityState === 'hidden') {
        setTime(0);
      }
    };
    document.addEventListener('visibilitychange', clearTime);
    return () => document.removeEventListener('visibilitychange', clearTime);
  }, [document.visibilityState]);

  const navigateApp = ({androidAppScheme, iosAppScheme}: NavigateAppArgs) => {
    if (!isMobileDevice()) {
      toast.error('모바일 기기에서만 앱 실행이 가능해요\n 모바일 환경에서 이용해 주세요.');
      return;
    }

    const url = isIOS() ? iosAppScheme : androidAppScheme;

    setTime(0);
    setTime(Date.now());
    window.location.href = url;
  };

  return {navigateApp};
};

export default useNavigateApp;
