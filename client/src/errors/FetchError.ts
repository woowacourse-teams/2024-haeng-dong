import {ServerError} from '../ErrorProvider';

class FetchError extends Error {
  requestBody: any;
  status: any;
  endpoint: any;
  errorBody: ServerError;

  constructor({requestBody, status, endpoint, errorBody}: FetchError) {
    // TODO: (@weadie) 타입과 수퍼 수정
    super(`Error ${status} at ${endpoint}`);
    this.requestBody = requestBody;
    this.status = status;
    this.endpoint = endpoint;
    this.errorBody = errorBody;
  }
}

export default FetchError;
