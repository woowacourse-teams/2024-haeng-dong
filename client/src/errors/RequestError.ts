import {RequestErrorType} from './requestErrorType';

class RequestError extends Error {
  requestBody;
  status;
  endpoint;
  method;
  errorCode;
  message;

  constructor({requestBody, status, endpoint, errorCode, method, name, message}: RequestErrorType) {
    super(errorCode);

    this.requestBody = requestBody;
    this.status = status;
    this.endpoint = endpoint;
    this.errorCode = errorCode;
    this.message = message;
    this.method = method;
    this.name = name;
  }
}

export default RequestError;
