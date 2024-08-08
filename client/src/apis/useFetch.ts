import {useState} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import sendLogToSentry from '@utils/sendLogToSentry';

import {UNHANDLED_ERROR} from '@constants/errorMessage';

import {ServerError, useError} from '../ErrorProvider';
import FetchError from '../errors/FetchError';

export const useFetch = () => {
  const {setError, clearError} = useError();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetch = async <T>(queryFunction: () => Promise<T>): Promise<T> => {
    setLoading(true);
    clearError();

    try {
      const result = await queryFunction();
      return result;
    } catch (error) {
      if (error instanceof FetchError) {
        const errorBody: ServerError = error.errorBody;
        setError(errorBody);
        captureError(error, navigate);

        // throw new Error(errorBody.message); // TODO: (@weadie) 이것때문에 alert가 뜹니다. 빠른 시일 내에 수정 예정
      } else {
        setError({errorCode: UNHANDLED_ERROR, message: JSON.stringify(error)});
        throw new Error(UNHANDLED_ERROR);
      }

      return;
    } finally {
      setLoading(false);
    }
  };

  return {loading, fetch};
};

const captureError = async (error: Error, navigate: NavigateFunction) => {
  const errorBody: ServerError =
    error instanceof FetchError
      ? error.errorBody
      : {message: await JSON.parse(error.message), errorCode: UNHANDLED_ERROR};

  switch (errorBody?.errorCode) {
    case 'INTERNAL_SERVER_ERROR':
      sendLogToSentry({error, errorBody, level: 'fatal'});
      break;

    case 'TOKEN_INVALID':
      sendLogToSentry({error, errorBody});
      break;

    case 'TOKEN_EXPIRED':
      sendLogToSentry({error, errorBody});
      // TODO: (@weadie) 여기에 토스트를 띄울지 말지
      navigate('/'); // TODO: (@weadie) 루트 경로 상수화

      break;

    case 'TOKEN_NOT_FOUND':
      sendLogToSentry({error, errorBody});
      break;

    // 비밀 번호를 까먹는 사람이 얼마나 많은 지 추측하기 위함
    case 'PASSWORD_INVALID':
      sendLogToSentry({error, errorBody, level: 'debug'});
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
