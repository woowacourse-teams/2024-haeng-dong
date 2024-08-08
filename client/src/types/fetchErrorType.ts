import {Method} from '@apis/fetcher';
import {ServerError} from 'ErrorProvider';

export type FetchErrorType = Error & {
  requestBody: string;
  status: number;
  endpoint: string;
  errorBody: ServerError;
  method: Method;
};
