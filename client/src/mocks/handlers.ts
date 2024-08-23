import {authHandler} from './handlers/authHandlers';
import {eventHandler} from './handlers/eventHandlers';
import {reportHandlers} from './handlers/reportHandlers';
import {stepListHandler} from './handlers/stepListHandler';
import {testHandler} from './handlers/testHandlers';
import {memberReportInActionHandler} from './handlers/memberReportInActionHandlers';

export const handlers = [
  ...authHandler,
  ...eventHandler,
  ...testHandler,
  ...stepListHandler,
  ...reportHandlers,
  ...memberReportInActionHandler,
];
