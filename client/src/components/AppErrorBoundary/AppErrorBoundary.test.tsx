import {render, screen, waitFor} from '@testing-library/react';
import {act, ReactNode} from 'react';

import {useAppErrorStore} from '@store/appErrorStore';
import FetchError from '@errors/FetchError';
import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';
import {ToastProvider} from '@hooks/useToast/ToastProvider';
import AppErrorBoundary from './AppErrorBoundary';
import {MemoryRouter, useNavigate} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';

// 테스트용 헬퍼 컴포넌트
const TestComponent = ({triggerError}: {triggerError: () => void}) => {
  return <button onClick={triggerError}>Trigger Error</button>;
};

const setup = (ui: ReactNode) =>
  render(
    <HDesignProvider>
      <ToastProvider>
        <AppErrorBoundary>
          <MemoryRouter>{ui}</MemoryRouter>
        </AppErrorBoundary>
      </ToastProvider>
    </HDesignProvider>,
  );

describe('AppErrorBoundary', () => {
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

  // it('핸들링 불가능한 에러인 경우 fallback이 표시된다.', async () => {
  //   const navigate = useNavigate();
  //   (navigate as jest.Mock).mockImplementation(() => {});
  //   const {updateAppError} = useAppErrorStore.getState();

  //   const error = new Error('알 수 없는 에러');
  //   setup(<TestComponent triggerError={() => updateAppError(error)} />);

  //   act(() => {
  //     screen.getByText('Trigger Error').click();
  //   });

  //   // TODO: (@todari) 해결안됨
  //   await waitFor(() => {
  //     expect(navigate).toHaveBeenCalledWith('/error');
  //   });
  // });
});
