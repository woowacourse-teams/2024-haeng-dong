import {ServerError} from 'ErrorProvider';

export type FetchErrorType = Error & {
  requestBody: Body | object | null;
  status: number;
  endpoint: string;
  errorBody: ServerError;
};
