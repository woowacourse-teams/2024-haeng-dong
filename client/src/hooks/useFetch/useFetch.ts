import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useEventId from '@hooks/useEventId/useEventId';

import {UNKNOWN_ERROR} from '@constants/errorMessage';

import {useError} from '../../ErrorProvider';
import FetchError from '@errors/FetchError';
import {captureError} from '@utils/captureError';

type FetchProps<T> = {
  queryFunction: () => Promise<T>;
  onSuccess?: () => void;
  onError?: () => void;
};

export const useFetch = () => {
  const {setError, clearError} = useError();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {eventId} = useEventId();

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
      console.log(error);
      if (error instanceof Error) {
        const errorBody =
          error instanceof FetchError ? error.errorBody : {errorCode: error.name, message: error.message};

        console.log(errorBody);
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
