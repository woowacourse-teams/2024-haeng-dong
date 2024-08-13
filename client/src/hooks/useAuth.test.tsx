import {renderHook, waitFor} from '@testing-library/react';
import useAuth from './useAuth';
import {act} from 'react';
import {ErrorProvider, useError} from '../ErrorProvider';
import * as router from 'react-router';
import {MemoryRouter} from 'react-router-dom';

// 현재의 location path를 모킹합니다.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/event/abc-123/',
  }),
}));

describe('useAuth', () => {
  const initializeProvider = () =>
    renderHook(
      () => {
        return {errorResult: useError(), authResult: useAuth()};
      },
      {
        wrapper: ({children}) => (
          <MemoryRouter>
            <ErrorProvider>{children}</ErrorProvider>
          </MemoryRouter>
        ),
      },
    );

  describe('auth', () => {
    it('쿠키에 토큰이 담겨있지 않다면 인증이 실패한다', async () => {
      const {result} = initializeProvider();

      await act(async () => {
        expect(await result.current.authResult.checkAuthentication());
      });

      await waitFor(() => {
        expect(result.current.errorResult.error?.errorCode).toBe('TOKEN_NOT_FOUND');
      });
    });

    it('쿠키에 담겨있는 토큰이 올바르다면 인증에 성공한다', async () => {
      document.cookie = 'eventToken=valid-token';

      const {result} = initializeProvider();

      await act(async () => {
        expect(await result.current.authResult.checkAuthentication());
      });

      await waitFor(() => {
        expect(result.current.errorResult.error).toBe(null);
      });
    });

    it('쿠키에 담겨있는 토큰이 유효하지 않다면 인증에 실패한다.', async () => {
      document.cookie = 'eventToken=fake-token';

      const {result} = initializeProvider();

      await act(async () => {
        expect(await result.current.authResult.checkAuthentication());
      });

      await waitFor(() => {
        expect(result.current.errorResult.error?.errorCode).toBe('TOKEN_INVALID');
      });
    });
  });

  describe('login', () => {
    it('비밀 번호가 올바르다면 로그인이 성공한다.', async () => {
      const {result} = initializeProvider();

      await act(async () => {
        expect(await result.current.authResult.loginUser({password: '1111'}));
      });

      await waitFor(() => {
        expect(result.current.errorResult.error).toBe(null);
      });
    });

    it('비밀 번호가 4자리가 아니라면 로그인에 실패한다.', async () => {
      const {result} = initializeProvider();

      await act(async () => {
        expect(await result.current.authResult.loginUser({password: '111'}));
      });

      await waitFor(() => {
        expect(result.current.errorResult.error?.errorCode).toBe('EVENT_PASSWORD_FORMAT_INVALID');
      });
    });

    it('비밀 번호가 틀렸다면 로그인에 실패한다.', async () => {
      const {result} = initializeProvider();

      await act(async () => {
        expect(await result.current.authResult.loginUser({password: '9999'}));
      });

      await waitFor(() => {
        expect(result.current.errorResult.error?.errorCode).toBe('PASSWORD_INVALID');
      });
    });
  });
});
