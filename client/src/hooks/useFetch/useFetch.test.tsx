import {renderHook, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {act} from 'react';

import {requestPostWithoutResponse} from '@apis/fetcher';

import {captureError} from '@utils/captureError';

import {UNKNOWN_ERROR} from '@constants/errorMessage';

import {ErrorProvider, useError} from '../../ErrorProvider';

import {useFetch} from './useFetch';
import FetchError from '@errors/FetchError';

describe('useFetch', () => {
  const initializeProvider = () =>
    renderHook(
      () => {
        return {errorResult: useError(), fetchResult: useFetch()};
      },
      {
        wrapper: ({children}) => (
          <MemoryRouter>
            <ErrorProvider>{children}</ErrorProvider>
          </MemoryRouter>
        ),
      },
    );

  describe('요청이 성공하는 경우', () => {
    it('요청이 성공했다면 그대로 결과를 반환한다.', async () => {
      const {result} = initializeProvider();
      const mockQueryFunction = jest.fn().mockResolvedValue('mocked data');

      let data;

      await act(async () => {
        data = await result.current.fetchResult.fetch({queryFunction: mockQueryFunction});
      });

      expect(data).toBe('mocked data');
    });

    it('onSuccess 콜백을 넘겨준 경우 콜백을 실행한다.', async () => {
      const {result} = initializeProvider();
      const mockQueryFunction = jest.fn().mockResolvedValue('mocked data');
      const onSuccess = jest.fn();

      await act(async () => {
        await result.current.fetchResult.fetch({queryFunction: mockQueryFunction, onSuccess});
      });

      expect(onSuccess).toHaveBeenCalled();
    });
  });

  describe('요청이 실패하는 경우', () => {
    describe('발생한 에러가 Error 인스턴스인 경우', () => {
      const error = {
        errorCode: 'TOKEN_NOT_FOUND',
        message: '핸들링되는 테스트 에러입니다.',
      };
      const errorThrowFunction = () => requestPostWithoutResponse({endpoint: '/throw-handle-error'});

      it('FetchError가 발생하면 해당 에러의 errorBody를 사용해 상태를 저장한다.', async () => {
        const {result} = initializeProvider();
        const fetchError = new FetchError({
          errorBody: {errorCode: 'UNHANDLED', message: 'Fetch error occurred'},
          name: 'UNHANDLED',
          message: 'Fetch error occurred',
          requestBody: '',
          status: 400,
          endpoint: '',
          method: 'POST',
        });
        const mockQueryFunction = jest.fn().mockRejectedValue(fetchError);

        await act(async () => {
          await result.current.fetchResult.fetch({queryFunction: mockQueryFunction});
        });

        await waitFor(() => {
          expect(result.current.errorResult.error?.errorCode).toBe('UNHANDLED');
          expect(result.current.errorResult.error?.message).toBe('Fetch error occurred');
        });
      });

      it('일반 Error가 발생하면 해당 에러의 name과 message를 사용해 상태를 저장한다.', async () => {
        const {result} = initializeProvider();
        const mockError = new Error('일반 에러 발생');
        const mockQueryFunction = jest.fn().mockRejectedValue(mockError);

        try {
          await act(async () => {
            await result.current.fetchResult.fetch({queryFunction: mockQueryFunction});
          });
        } catch (error) {
          // 에러 바운더리로 보내지는 에러라서 throw하는데 이를 받아줄 에러 바운더리를 호출하지 않았으므로 catch문에서 별다른 로직을 작성하지 않음
        }

        await waitFor(() => {
          expect(result.current.errorResult.error?.errorCode).toBe('Error');
          expect(result.current.errorResult.error?.message).toBe('일반 에러 발생');
        });
      });

      it('onError 콜백을 넘겨준 경우 onError를 실행한다.', async () => {
        const {result} = initializeProvider();
        const onError = jest.fn();

        await act(async () => {
          await result.current.fetchResult.fetch({queryFunction: errorThrowFunction, onError});
        });

        expect(onError).toHaveBeenCalled();
      });

      it('에러가 발생하면 로그를 보낸다.', async () => {
        const {result} = initializeProvider();

        await act(async () => {
          await result.current.fetchResult.fetch({queryFunction: errorThrowFunction});
        });

        expect(captureError).toHaveBeenCalled();
      });
    });

    describe('발생한 에러가 Error 인스턴스가 아닌 경우', () => {
      const mockQueryFunction = jest.fn().mockRejectedValue('unexpected error');

      it(`에러가 발생하면 그 에러를 던진다.`, async () => {
        const {result} = initializeProvider();

        // 에러가 발생하고 에러를 던지는지 확인
        await expect(
          act(async () => {
            await result.current.fetchResult.fetch({queryFunction: mockQueryFunction});
          }),
        ).rejects.toThrow(new Error(UNKNOWN_ERROR));
      });

      it('에러가 발생하면 로그를 보낸다.', async () => {
        const {result} = initializeProvider();

        await expect(
          act(async () => {
            await result.current.fetchResult.fetch({queryFunction: mockQueryFunction});
          }),
        ).rejects.toThrow(new Error(UNKNOWN_ERROR));

        expect(captureError).toHaveBeenCalled();
      });
    });
  });
});
