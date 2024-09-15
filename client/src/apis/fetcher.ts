import {RequestGetError, WithErrorHandlingStrategy} from '@errors/RequestGetError';

import objectToQueryString from '@utils/objectToQueryString';

import RequestError from '../errors/RequestError';

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type ObjectQueryParams = Record<string, string | number | boolean>;

type ErrorInfo = {
  errorCode: string;
  message: string;
};

/**
 * fetch의 2번째 인자로 들어가는 데이터의 타입은 RequestInit으로 기본적으로 제공됩니다.
 * 다만 이 RequestInit의 타입이 method가 optional이라서 이를 반드시 받도록하기 위해 RequestInitWithMethod라는 타입으로 확장하게 되었습니다.
 */
type RequestInitWithMethod = Omit<RequestInit, 'method'> & {method: Method};

type HeadersType = [string, string][] | Record<string, string> | Headers;

export type Body = BodyInit | object | null;

type RequestProps = {
  baseUrl?: string;
  endpoint: string;
  headers?: HeadersType;
  body?: Body;
  queryParams?: ObjectQueryParams;
  method: Method;
};

type RequestMethodProps = Omit<RequestProps, 'method'>;

type FetchType = {
  url: string;
  requestInit: RequestInitWithMethod;
};

const API_BASE_URL = process.env.API_BASE_URL ?? '';

export const requestGet = async <T>({
  headers = {},
  errorHandlingStrategy,
  ...args
}: WithErrorHandlingStrategy<RequestMethodProps>): Promise<T> => {
  const response = await request({
    ...args,
    method: 'GET',
    headers,
    errorHandlingStrategy,
  });

  const data: T = await response!.json();
  return data;
};

export const requestPatch = ({headers = {}, ...args}: RequestMethodProps) => {
  return request({method: 'PATCH', headers, ...args});
};

export const requestPut = ({headers = {}, ...args}: RequestMethodProps) => {
  return request({method: 'PUT', headers, ...args});
};

export const requestPostWithoutResponse = async ({headers = {}, ...args}: RequestMethodProps) => {
  await request({method: 'POST', headers, ...args});
};

export const requestPostWithResponse = async <T>({headers = {}, ...args}: RequestMethodProps): Promise<T> => {
  const response = await request({method: 'POST', headers, ...args});

  const data: T = await response!.json();
  return data;
};

export const requestDelete = ({headers = {}, ...args}: RequestMethodProps) => {
  return request({method: 'DELETE', headers, ...args});
};

const prepareRequest = ({baseUrl = API_BASE_URL, method, endpoint, headers, body, queryParams}: RequestProps) => {
  let url = `${baseUrl}${endpoint}`;

  if (queryParams) url += `?${objectToQueryString(queryParams)}`;

  const requestInit: RequestInitWithMethod = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
    body: body ? JSON.stringify(body) : null,
  };

  return {url, requestInit};
};

const executeRequest = async ({url, requestInit, errorHandlingStrategy}: WithErrorHandlingStrategy<FetchType>) => {
  try {
    const response: Response = await fetch(url, requestInit);

    if (!response.ok) {
      throw await createError({
        response,
        body: requestInit.body ? JSON.stringify(requestInit.body) : null,
        requestInit,
        errorHandlingStrategy,
      });
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error; // 그대로 RequestError 또는 Error 인스턴스를 던집니다.
    }

    throw error;
  }
};

const request = async (props: WithErrorHandlingStrategy<RequestProps>) => {
  const {url, requestInit} = prepareRequest(props);
  return executeRequest({url, requestInit, errorHandlingStrategy: props.errorHandlingStrategy});
};

type CreateError = {
  response: Response;
  body: Body;
  requestInit: RequestInitWithMethod;
};

const createError = async ({
  response,
  body,
  requestInit,
  errorHandlingStrategy,
}: WithErrorHandlingStrategy<CreateError>) => {
  const {errorCode, message}: ErrorInfo = await response.json();

  if (requestInit.method === 'GET') {
    return new RequestGetError({
      status: response.status,
      requestBody: body,
      endpoint: response.url,
      name: errorCode,
      method: requestInit.method,
      errorHandlingStrategy,
      message,
      errorCode,
    });
  }

  return new RequestError({
    status: response.status,
    requestBody: body,
    endpoint: response.url,
    name: errorCode,
    method: requestInit.method,
    message,
    errorCode,
  });
};
