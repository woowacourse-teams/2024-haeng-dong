import FetchError from '@errors/FetchError';

import sendLogToSentry from './sendLogToSentry';
import {ErrorInfo} from 'AppErrorBoundary';

export const captureError = async (error: Error) => {
  // prod 환경에서만 Sentry capture 실행
  if (process.env.NODE_ENV !== 'production') return;

  const errorInfo: ErrorInfo =
    error instanceof FetchError ? error.errorInfo : {message: error.message, errorCode: error.name};

  switch (errorInfo?.errorCode) {
    case 'INTERNAL_SERVER_ERROR':
      sendLogToSentry({error, errorInfo, level: 'fatal'});
      break;

    case 'FORBIDDEN':
      sendLogToSentry({error, errorInfo});

      break;

    case 'TOKEN_INVALID':
      sendLogToSentry({error, errorInfo});

      break;

    case 'TOKEN_EXPIRED':
      sendLogToSentry({error, errorInfo});

      break;

    case 'TOKEN_NOT_FOUND':
      sendLogToSentry({error, errorInfo});

      break;

    // 비밀 번호를 까먹는 사람이 얼마나 많은 지 추측하기 위함
    case 'PASSWORD_INVALID':
      sendLogToSentry({error, errorInfo, level: 'debug'});

      break;

    // 1천만원 이상 입력하는 사람이 얼마나 많은 지 추측하기 위함
    case 'BILL_ACTION_PRICE_INVALID':
      sendLogToSentry({error, errorInfo, level: 'debug'});
      break;

    default:
      sendLogToSentry({error, errorInfo, level: 'fatal'});
      break;
  }
};
