import {server} from './src/mocks/server';
import * as router from 'react-router';
import '@testing-library/jest-dom'; // toBeInTheDocument를 인식하기 위해 @testing-library/jest-dom/extend-expect추가
import 'jest-canvas-mock'; // jsdom은 canvas를 추가할 수 없기 때문에 이를 해결하는 라이브러리 추가

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
