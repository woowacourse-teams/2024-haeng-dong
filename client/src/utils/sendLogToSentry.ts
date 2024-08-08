import * as Sentry from '@sentry/react';

import {ServerError} from 'ErrorProvider';

import FetchError from '../errors/FetchError';

import {UNKNOWN_ERROR} from '@constants/errorMessage';

/**
 * level은 아래와 같은 용도에 맞게 지정해줍니다.
 *
 * fatal: 앱이 종료될 수 있는 치명적인 오류
 * error: 특정 기능 실패로 앱 종료까지는 아닌 오류
 * warning: 잠재적으로 문제가 될 수 있는 오류. 현재는 심각하지 않은 오류
 * info: 시스템의 정상적인 동작을 나타냄. 중요한 이벤트나 상태 변화 기록용
 * debug: 디버깅 목적으로 사용됨
 * log: 일반적인 로그 메세지
 */

type SentryLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';
type SendLogToSentry = {
  level?: SentryLevel;
  error: Error;
  errorBody: ServerError;
};

const sendLogToSentry = ({level = 'error', error, errorBody}: SendLogToSentry) => {
  Sentry.withScope(scope => {
    const {errorCode, message} = errorBody;
    scope.setLevel(level);

    scope.setTag('environment', process.env.NODE_ENV);

    if (error instanceof FetchError) {
      console.log('fetchError');
      scope.setTags({
        endpoint: error.endpoint,
        url: window.location.href,
        errorCode,
        errorMessage: message,
        status: error.status,
        // requestBody: JSON.stringify(error.requestBody),
        method: error.method,
      });

      Sentry.captureMessage(`${errorCode}`);
    } else if (error instanceof Error) {
      console.log('error');

      scope.setTags({
        url: window.location.href,
        errorCode,
        errorMessage: message,
      });

      Sentry.captureMessage(`${errorCode}`);
    } else {
      scope.setTags({
        url: window.location.href,
        errorCode,
        message: UNKNOWN_ERROR,
        name: UNKNOWN_ERROR,
      });
      Sentry.captureMessage(`${errorCode}`);
    }
  });
};

export default sendLogToSentry;
