import RequestError from '@errors/RequestError';

import sendLogToSentry from './sendLogToSentry';

export const captureError = async (error: Error) => {
  // prod 환경에서만 Sentry capture 실행
  if (process.env.NODE_ENV !== 'production') return;

  if (error instanceof RequestError) {
    switch (error.errorCode) {
      case 'INTERNAL_SERVER_ERROR':
        sendLogToSentry({error, level: 'fatal'});
        break;

      case 'FORBIDDEN':
        sendLogToSentry({error});

        break;

      case 'TOKEN_INVALID':
        sendLogToSentry({error});

        break;

      case 'TOKEN_EXPIRED':
        sendLogToSentry({error});

        break;

      case 'TOKEN_NOT_FOUND':
        sendLogToSentry({error});

        break;

      // 비밀 번호를 까먹는 사람이 얼마나 많은 지 추측하기 위함
      case 'PASSWORD_INVALID':
        sendLogToSentry({error, level: 'debug'});

        break;

      // 1천만원 이상 입력하는 사람이 얼마나 많은 지 추측하기 위함
      case 'BILL_ACTION_PRICE_INVALID':
        sendLogToSentry({error, level: 'debug'});
        break;

      default:
        sendLogToSentry({error, level: 'fatal'});
        break;
    }
  } else {
    sendLogToSentry({error, level: 'fatal'});
  }
};
