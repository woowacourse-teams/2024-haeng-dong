import {ServerError} from '../ErrorProvider';
import {FetchErrorType} from '../types/fetchErrorType';

class FetchError extends Error {
  requestBody;
  status;
  endpoint;
  errorBody;

  constructor({requestBody, status, endpoint, errorBody}: FetchErrorType) {
    // TODO: (@weadie) 타입과 수퍼 수정
    super(`Error ${status} at ${endpoint}`);
    this.requestBody = requestBody;
    this.status = status;
    this.endpoint = endpoint;
    this.errorBody = errorBody;
  }
}

export default FetchError;
