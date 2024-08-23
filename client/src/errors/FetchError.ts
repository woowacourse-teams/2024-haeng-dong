import {FetchErrorType} from '../types/fetchErrorType';

class FetchError extends Error {
  requestBody;
  status;
  endpoint;
  errorInfo;
  method;

  constructor({requestBody, status, endpoint, errorInfo, method, name, message}: FetchErrorType) {
    super(errorInfo.errorCode);

    this.requestBody = requestBody;
    this.status = status;
    this.endpoint = endpoint;
    this.errorInfo = errorInfo;
    this.method = method;
    this.name = name;
    this.message = message;
  }
}

export default FetchError;
