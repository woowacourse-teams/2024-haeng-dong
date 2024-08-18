import {renderHook} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {act} from 'react';

import {PASSWORD_LENGTH} from '@constants/password';

import {VALID_PASSWORD_FOR_TEST} from '@mocks/validValueForTest';
import {VALID_EVENT_NAME_LENGTH_IN_SERVER} from '@mocks/serverConstants';

import {ErrorProvider, useError} from '../../ErrorProvider';

import useEvent from './useEvent';

describe('useEvent', () => {
  const initializeProvider = () =>
    renderHook(
      () => {
        return {errorResult: useError(), eventResult: useEvent()};
      },
      {
        wrapper: ({children}) => (
          <MemoryRouter>
            <ErrorProvider>{children}</ErrorProvider>
          </MemoryRouter>
        ),
      },
    );

  it('이름과 비밀번호를 받아 새로운 이벤트를 생성한다.', async () => {
    const {result} = initializeProvider();

    await act(async () => {
      expect(
        await result.current.eventResult.createNewEvent({eventName: '테스트이름', password: VALID_PASSWORD_FOR_TEST}),
      );
    });

    await act(async () => {
      expect(result.current.errorResult.error).toBe(null);
    });
  });

  it(`이름 길이가 ${VALID_EVENT_NAME_LENGTH_IN_SERVER.min} ~ ${VALID_EVENT_NAME_LENGTH_IN_SERVER.max}사이가 아닌 경우 이벤트를 생성할 수 없다.`, async () => {
    const {result} = initializeProvider();

    await act(async () => {
      expect(await result.current.eventResult.createNewEvent({eventName: '', password: VALID_PASSWORD_FOR_TEST}));
    });

    await act(async () => {
      expect(result.current.errorResult.error?.errorCode).toBe('EVENT_NAME_LENGTH_INVALID');
    });
  });

  it(`비밀번호가 ${PASSWORD_LENGTH}자리수가 아닌 경우 이벤트를 생성할 수 없다`, async () => {
    const {result} = initializeProvider();

    await act(async () => {
      expect(await result.current.eventResult.createNewEvent({eventName: '테스트이름', password: 1}));
    });

    await act(async () => {
      expect(result.current.errorResult.error?.errorCode).toBe('EVENT_PASSWORD_FORMAT_INVALID');
    });
  });
});
