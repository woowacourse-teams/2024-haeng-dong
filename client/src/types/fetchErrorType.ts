import {ServerError} from 'ErrorProvider';

import {Method} from '@apis/fetcher';

export type FetchErrorType = Error & {
  requestBody: string;
  status: number;
  endpoint: string;
  errorBody: ServerError;
  method: Method;
};
