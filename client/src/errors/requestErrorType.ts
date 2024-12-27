import {Body, Method} from '@apis/request';

export type RequestErrorType = Error & {
  requestBody: Body;
  status: number;
  endpoint: string;
  errorCode: string;
  message: string;
  method?: Method;
};
