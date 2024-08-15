import {server} from './src/mocks/server';
import * as router from 'react-router';

beforeAll(() => {
  server.listen();

  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      ...window.location,
      pathname: '/event/abc-123/', // 원하는 pathname 설정
    },
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeAll(() => {});
jest.mock('./src/utils/captureError');
jest.mock('./src/utils/sendLogToSentry');

jest.spyOn(router, 'useNavigate').mockImplementation(() => jest.fn());
