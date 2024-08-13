import {server} from './src/mocks/server';
import * as router from 'react-router';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('./src/hooks/useFetch', () => ({
  ...jest.requireActual('./src/hooks/useFetch'),
  captureError: jest.fn(),
}));

jest.mock('./src/utils/sendLogToSentry');

jest.spyOn(router, 'useNavigate').mockImplementation(() => jest.fn());
