import RequestError from '@errors/RequestError';

const isRequestError = (error: Error) => {
  return error instanceof RequestError;
};

export default isRequestError;
