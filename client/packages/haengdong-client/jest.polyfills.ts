import {TextDecoder, TextEncoder} from 'node:util';

Object.defineProperties(globalThis, {
  TextDecoder: {value: TextDecoder},
  TextEncoder: {value: TextEncoder},
});

import {Blob, File} from 'node:buffer';

import {fetch, Headers, FormData, Request, Response} from 'undici';

Object.defineProperties(globalThis, {
  fetch: {value: fetch, writable: true},
  Blob: {value: Blob},
  File: {value: File},
  Headers: {value: Headers},
  FormData: {value: FormData},
  Request: {value: Request},
  Response: {value: Response},
});
