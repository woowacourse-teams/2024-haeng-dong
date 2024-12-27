import {isIOS, isMobileDevice} from '@utils/detectDevice';

import toast from '../hooks/useToast/toast';

type NavigateAppArgs = {
  android: AppUrl;
  ios: AppUrl;
  options?: NavigateAppOptions;
};

type NavigateAppOptions = {
  delayBeforeCheckTime?: number; // 앱 실행 후 설치 여부를 확인하기 전까지의 대기 시간.
  installThresholdTime?: number; // 설치 여부를 판단하는 기준 시간.
};

const DEFAULT_DELAY_BEFORE_CHECK_TIME = 1000;
const DEFAULT_INSTALL_THRESHOLD_TIME = 1500;

type AppUrl = {
  appScheme: string;
  storeUrl: string;
};

const navigateApp = ({android, ios, options}: NavigateAppArgs) => {
  if (!isMobileDevice()) {
    toast.error('모바일 기기에서만 앱 실행이 가능해요\n 모바일 환경에서 이용해 주세요.');
    return;
  }

  const url = isIOS() ? ios.appScheme : android.appScheme;
  const storeUrl = isIOS() ? ios.storeUrl : android.storeUrl;

  const now = Date.now();
  window.location.href = url;

  setTimeout(() => {
    if (Date.now() - now < (options?.installThresholdTime ?? DEFAULT_INSTALL_THRESHOLD_TIME)) {
      toast.error('앱이 설치되지 않았어요. 설치 후 이용해주세요');
      window.location.href = storeUrl;
    }
  }, options?.delayBeforeCheckTime ?? DEFAULT_DELAY_BEFORE_CHECK_TIME);
};

export default navigateApp;
