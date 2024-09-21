import {authHandler} from './handlers/authHandlers';
import {eventHandler} from './handlers/eventHandlers';
import {reportHandlers} from './handlers/reportHandlers';
import {testHandler} from './handlers/testHandlers';
import {billHandler} from './handlers/billHandler';
import {memberHandler} from './handlers/memberHandler';

export const handlers = [
  ...authHandler,
  ...eventHandler,
  ...billHandler,
  ...memberHandler,
  ...testHandler,
  ...reportHandlers,
];
