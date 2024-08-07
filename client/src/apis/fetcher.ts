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

export const requestPost = async <T>({headers = {}, ...args}: RequestProps): Promise<T | undefined> => {
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
    headers: {
      'Content-Type': 'application/json',
      // Authorization: token,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  let url = `${baseUrl}${endpoint}`;

  if (queryParams) url += `?${objectToQueryString(queryParams)}`;

  return errorHandler(url, options);
};

// class ErrorWithHeader extends Error {
//   header: string;

//   constructor(header: string, message: string) {
//     super(message);
//     this.name = this.constructor.name;
//     this.header = header;
//   }
// }

const errorHandler = async (url: string, options: Options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const serverErrorMessage = await response.text();
      throw new Error(serverErrorMessage || ''); // 받은 에러 메세지가 없는 경우는 서버에게..
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return;
  }
};

// export const ERROR_MESSAGE = {
//   SYSTEM_FAULT: 'system error. 관리자에게 문의하십시오',
//   OFFLINE: '네트워크 연결이 끊어졌습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
//   UNKNOWN: '알 수 없는 에러입니다. 관리자에게 문의해주세요. (연락처...)',
// };

// const getErrorMessage = (error: unknown) => {
//   return ERROR_MESSAGE.UNKNOWN;

// if (error instanceof TypeError) return ERROR_MESSAGE.OFFLINE;

// if (error instanceof Error) {
//   const mappedErrorMessage = Object.entries(SERVER_ERROR_MESSAGE).find(([key]) => {
//     const upperCaseErrorMessage = convertToUpperCase(error.message.split(SERVER_ERROR_MESSAGE_DIVIDER)[0]);

//     return upperCaseErrorMessage.includes(key);
//   })?.[1];

//   return mappedErrorMessage ?? ERROR_MESSAGE.UNKNOWN;
// }

// return ERROR_MESSAGE.UNKNOWN;
// };
