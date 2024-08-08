import {ServerError} from 'ErrorProvider';

import {UNHANDLED_ERROR} from '@constants/errorMessage';

import FetchError from '../errors/FetchError';

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type Body = ReadableStream | XMLHttpRequestBodyInit;
type HeadersType = [string, string][] | Record<string, string> | Headers;

export type ObjectQueryParams = Record<string, string | number | boolean>;

type RequestProps = {
  baseUrl?: string;
  endpoint: string;
  headers?: HeadersType;
  body?: Body | object | null;
  queryParams?: ObjectQueryParams;
  // errorMessage: string;
};

type FetcherProps = RequestProps & {
  method: Method;
};

type Options = {
  method: Method;
  headers: HeadersType;
  body?: Body | null;
};

const API_BASE_URL = process.env.API_BASE_URL;

const objectToQueryString = (params: ObjectQueryParams): string => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

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

export const requestPost = async <T>({headers = {}, ...args}: RequestProps): Promise<T> => {
  const response = await fetcher({method: 'POST', headers, ...args});

  const contentType = response!.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const data: T = await response!.json();
    return data;
  }

  return;
};

export const requestDelete = ({headers = {}, ...args}: RequestProps) => {
  return fetcher({method: 'DELETE', headers, ...args});
};

const fetcher = ({baseUrl = API_BASE_URL, method, endpoint, headers, body, queryParams}: FetcherProps) => {
  // const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const options = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: token,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  let url = `${baseUrl}${endpoint}`;

  if (queryParams) url += `?${objectToQueryString(queryParams)}`;

  return errorHandler(url, options, body);
};

const errorHandler = async (url: string, options: Options, body: any) => {
  try {
    const response: Response = await fetch(url, options);

    if (!response.ok) {
      const serverErrorBody: ServerError = await response.json();

      throw new FetchError({
        status: response.status,
        requestBody: body,
        endpoint: response.url,
        errorBody: serverErrorBody,
        name: serverErrorBody.errorCode,
        message: serverErrorBody.message || '',
      });
    }

    return response;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }

    throw new Error(UNHANDLED_ERROR);
  }
};
