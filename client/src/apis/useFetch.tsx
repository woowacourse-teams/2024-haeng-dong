import {useError} from '../ErrorProvider';
import {useState} from 'react';

interface FetchOptions<T> {
  queryFn: () => Promise<T>;
}

export const useFetch = () => {
  const {setError, clearError} = useError();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const request = async <T,>({queryFn}: FetchOptions<T>): Promise<T | null> => {
    setLoading(true);
    clearError();
    try {
      const result = await queryFn();
      setData(result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        const errorBody = await JSON.parse(error.message);
        setError(errorBody);
        console.log(error);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {data, loading, request};
};
