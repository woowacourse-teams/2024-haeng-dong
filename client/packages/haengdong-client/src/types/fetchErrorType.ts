import {ErrorInfo} from '@components/AppErrorBoundary/ErrorCatcher';

import {Method} from '@apis/fetcher';

export type FetchErrorType = Error & {
  requestBody: string;
  status: number;
  endpoint: string;
  errorInfo: ErrorInfo;
  method: Method;
};
