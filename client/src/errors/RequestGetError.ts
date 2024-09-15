import RequestError from './RequestError';
import {RequestErrorType} from './requestErrorType';

type ErrorHandlingStrategy = 'toast' | 'errorBoundary';

export type WithErrorHandlingStrategy<P = unknown> = P & {
  errorHandlingStrategy?: ErrorHandlingStrategy;
};

class RequestGetError extends RequestError {
  errorHandlingStrategy: string;

  // errorHandlingType은 기본적으로 제일 많이 사용되는 toast로 했습니다.
  constructor({errorHandlingStrategy = 'toast', ...rest}: WithErrorHandlingStrategy<RequestErrorType>) {
    super(rest);

    this.errorHandlingStrategy = errorHandlingStrategy;
  }
}

export {RequestGetError};
