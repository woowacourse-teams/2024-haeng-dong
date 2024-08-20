import {ErrorInfo} from '@components/AppErrorBoundary/AppErrorBoundary';

import objectToQueryString from '@utils/objectToQueryString';

import {UNKNOWN_ERROR} from '@constants/errorMessage';

import FetchError from '../errors/FetchError';

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type Body = ReadableStream | XMLHttpRequestBodyInit;
type HeadersType = [string, string][] | Record<string, string> | Headers;

export type ObjectQueryParams = Record<string, string | number | boolean>;

type RequestProps = {
  baseUrl?: string;
  endpoint: string;
  headers?: HeadersType;
  body?: Body | object | null;
  queryParams?: ObjectQueryParams;
};

type FetcherProps = RequestProps & {
  method: Method;
};

type Options = {
  method: Method;
  headers: HeadersType;
  body?: Body | null;
};

type ErrorHandlerProps = {
  url: string;
  options: Options;
  body: string;
};

const API_BASE_URL = process.env.API_BASE_URL ?? '';

export const requestGet = async <T>({headers = {}, ...args}: RequestProps): Promise<T> => {
  const response = await fetcher({
    ...args,
    method: 'GET',
    headers,
  });

  const data: T = await response!.json();
  return data;
};

export const requestPatch = ({headers = {}, ...args}: RequestProps) => {
  return fetcher({method: 'PATCH', headers, ...args});
};

export const requestPut = ({headers = {}, ...args}: RequestProps) => {
  return fetcher({method: 'PUT', headers, ...args});
};

export const requestPostWithoutResponse = async ({headers = {}, ...args}: RequestProps) => {
  await fetcher({method: 'POST', headers, ...args});
};

export const requestPostWithResponse = async <T>({headers = {}, ...args}: RequestProps): Promise<T> => {
  const response = await fetcher({method: 'POST', headers, ...args});

  const data: T = await response!.json();
  return data;
};

export const requestDelete = ({headers = {}, ...args}: RequestProps) => {
  return fetcher({method: 'DELETE', headers, ...args});
};

const fetcher = ({baseUrl = API_BASE_URL, method, endpoint, headers, body, queryParams}: FetcherProps) => {
  const options = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  let url = `${baseUrl}${endpoint}`;

  if (queryParams) url += `?${objectToQueryString(queryParams)}`;

  return errorHandler({url, options, body: JSON.stringify(body)});
};

const errorHandler = async ({url, options, body}: ErrorHandlerProps) => {
  try {
    const response: Response = await fetch(url, options);

    if (!response.ok) {
      const serverErrorInfo: ErrorInfo = await response.json();

      throw new FetchError({
        status: response.status,
        requestBody: body,
        endpoint: response.url,
        errorInfo: serverErrorInfo,
        name: serverErrorInfo.errorCode,
        message: serverErrorInfo.message || '',
        method: options.method,
      });
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error; // 그대로 FetchError || Error 인스턴스를 던집니다.
    }

    throw new Error(UNKNOWN_ERROR);
  }
};
