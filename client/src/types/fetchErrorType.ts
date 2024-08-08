import {ServerError} from 'ErrorProvider';

export type FetchErrorType = {
  requestBody: Body | object | null;
  status: number;
  endpoint: string;
  errorBody: ServerError;
};
