import {useState} from 'react';

import {UNHANDLED_ERROR} from '@constants/errorMessage';

import {ServerError, useError} from '../ErrorProvider';

export const useFetch = () => {
  const {setError, clearError} = useError();
  const [loading, setLoading] = useState(false);

  const fetch = async <T>(queryFunction: () => Promise<T>): Promise<T> => {
    setLoading(true);
    clearError();

    try {
      const result = await queryFunction();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        const errorBody: ServerError = await JSON.parse(error.message);

        setError(errorBody);
        throw new Error(errorBody.message);
      } else {
        throw new Error(UNHANDLED_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  return {loading, fetch};
};
