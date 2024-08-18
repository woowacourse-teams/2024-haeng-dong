import {NavigateFunction} from 'react-router-dom';

import FetchError from '@errors/FetchError';
import {ServerError} from 'ErrorProvider';

import {ROUTER_URLS} from '@constants/routerUrls';

import sendLogToSentry from './sendLogToSentry';

export const captureError = async (error: Error, navigate: NavigateFunction, eventId: string) => {
  // prod 환경에서만 Sentry capture 실행
  if (process.env.NODE_ENV !== 'production') return;

  const errorBody: ServerError =
    error instanceof FetchError ? error.errorBody : {message: error.message, errorCode: error.name};

  switch (errorBody?.errorCode) {
    case 'INTERNAL_SERVER_ERROR':
      sendLogToSentry({error, errorBody, level: 'fatal'});
      break;

    case 'FORBIDDEN':
      sendLogToSentry({error, errorBody});
      navigate(`${ROUTER_URLS.event}/${eventId}/login`);
      break;

    case 'TOKEN_INVALID':
      sendLogToSentry({error, errorBody});
      navigate(`${ROUTER_URLS.event}/${eventId}/login`);
      break;

    case 'TOKEN_EXPIRED':
      sendLogToSentry({error, errorBody});
      navigate(`${ROUTER_URLS.event}/${eventId}/login`);
      break;

    case 'TOKEN_NOT_FOUND':
      sendLogToSentry({error, errorBody});
      navigate(`${ROUTER_URLS.event}/${eventId}/login`);
      break;

    // 비밀 번호를 까먹는 사람이 얼마나 많은 지 추측하기 위함
    case 'PASSWORD_INVALID':
      sendLogToSentry({error, errorBody, level: 'debug'});
      navigate(`${ROUTER_URLS.event}/${eventId}/login`);
      break;

    // 1천만원 이상 입력하는 사람이 얼마나 많은 지 추측하기 위함
    case 'BILL_ACTION_PRICE_INVALID':
      sendLogToSentry({error, errorBody, level: 'debug'});
      break;

    default:
      sendLogToSentry({error, errorBody, level: 'fatal'});
      break;
  }
};
