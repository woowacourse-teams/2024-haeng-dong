import {render, screen, waitFor} from '@testing-library/react';
import {act, ReactNode} from 'react';
import {MemoryRouter} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';

import FetchError from '@errors/FetchError';
import {ToastProvider} from '@hooks/useToast/ToastProvider';

import {useAppErrorStore} from '@store/appErrorStore';

import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';

import UnhandledErrorBoundary from '../../UnhandledErrorBoudnary';

import ErrorCatcher from './ErrorCatcher';

// 테스트용 헬퍼 컴포넌트
const TestComponent = ({triggerError}: {triggerError: () => void}) => {
  return <button onClick={triggerError}>Trigger Error</button>;
};

const setup = (ui: ReactNode) =>
  render(
    <HDesignProvider>
      <UnhandledErrorBoundary>
        <ToastProvider>
          <ErrorCatcher>
            <MemoryRouter>{ui}</MemoryRouter>
          </ErrorCatcher>
        </ToastProvider>
      </UnhandledErrorBoundary>
    </HDesignProvider>,
  );

describe('ErrorCatcher', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

  it('핸들링 가능한 에러인 경우 토스트가 표시된다.', async () => {
    const errorCode = 'EVENT_NOT_FOUND';
    const error = new FetchError({
      errorInfo: {errorCode, message: '서버의 에러메세지'},
      name: errorCode,
      message: '에러메세지',
      status: 200,
      endpoint: '',
      method: 'GET',
      requestBody: '',
    });

    const {updateAppError} = useAppErrorStore.getState();

    setup(<TestComponent triggerError={() => updateAppError(error)} />);

    act(() => {
      screen.getByText('Trigger Error').click();
    });

    const errorMessage = SERVER_ERROR_MESSAGES[errorCode];

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('핸들링 불가능한 에러인 경우 에러 바운더리가 표시된다.', async () => {
    const errorCode = '모르겠는 에러';
    const error = new FetchError({
      errorInfo: {errorCode, message: '모르겠는 에러메세지'},
      name: errorCode,
      message: '에러메세지',
      status: 400,
      endpoint: '',
      method: 'GET',
      requestBody: '',
    });

    const {updateAppError} = useAppErrorStore.getState();

    setup(<TestComponent triggerError={() => updateAppError(error)} />);

    act(() => {
      screen.getByText('Trigger Error').click();
    });

    await waitFor(() => {
      expect(screen.getByText('알 수 없는 오류입니다.')).toBeInTheDocument();
    });
  });
});
