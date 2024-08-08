import {FetchErrorType} from '../types/fetchErrorType';

class FetchError extends Error {
  requestBody;
  status;
  endpoint;
  errorBody;
  method;

  constructor({requestBody, status, endpoint, errorBody, method, name, message}: FetchErrorType) {
    super(errorBody.errorCode);

    this.requestBody = requestBody;
    this.status = status;
    this.endpoint = endpoint;
    this.errorBody = errorBody;
    this.method = method;
    this.name = name;
    this.message = message;
  }
}

export default FetchError;
