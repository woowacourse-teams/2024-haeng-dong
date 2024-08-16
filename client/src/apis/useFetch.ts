import {useState} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import sendLogToSentry from '@utils/sendLogToSentry';
import getEventIdByUrl from '@utils/getEventIdByUrl';

import {UNKNOWN_ERROR} from '@constants/errorMessage';
import {ROUTER_URLS} from '@constants/routerUrls';

import {ServerError, useError} from '../ErrorProvider';
import FetchError from '../errors/FetchError';

type FetchProps<T> = {
  queryFunction: () => Promise<T>;
  onSuccess?: () => void;
  onError?: () => void;
};

export const useFetch = () => {
  const {setError, clearError} = useError();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();

  const fetch = async <T>({queryFunction, onSuccess, onError}: FetchProps<T>): Promise<T> => {
    setLoading(true);
    clearError();

    try {
      const result = await queryFunction();

      if (onSuccess) {
        onSuccess();
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        const errorBody =
          error instanceof FetchError ? error.errorBody : {errorCode: error.name, message: error.message};

        setError(errorBody);

        if (onError) {
          onError();
        }

        captureError(error, navigate, eventId);
      } else {
        setError({errorCode: UNKNOWN_ERROR, message: JSON.stringify(error)});
        captureError(new Error(UNKNOWN_ERROR), navigate, eventId);

        // 에러를 throw 해 에러 바운더리로 보냅니다. 따라서 에러 이름은 중요하지 않음
        throw new Error(UNKNOWN_ERROR);
      }
    } finally {
      setLoading(false);
    }

    return {} as T;
  };

  return {loading, fetch};
};

const captureError = async (error: Error, navigate: NavigateFunction, eventId: string) => {
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
