import {render, screen, waitFor} from '@testing-library/react';
import {act, ReactNode} from 'react';
import {MemoryRouter} from 'react-router-dom';

import ToastContainer from '@components/Toast/ToastContainer';
import RequestError from '@errors/RequestError';

import {useAppErrorStore} from '@store/appErrorStore';

import {HDesignProvider} from '@HDesign/index';

import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';

import UnPredictableErrorBoundary from '../../UnPredictableErrorBoundary';

import ErrorCatcher from './ErrorCatcher';

// 테스트용 헬퍼 컴포넌트
const TestComponent = ({triggerError}: {triggerError: () => void}) => {
  return <button onClick={triggerError}>Trigger Error</button>;
};

const setup = (ui: ReactNode) =>
  render(
    <HDesignProvider>
      <UnPredictableErrorBoundary>
        <ToastContainer />
        <ErrorCatcher>
          <MemoryRouter>{ui}</MemoryRouter>
        </ErrorCatcher>
      </UnPredictableErrorBoundary>
    </HDesignProvider>,
  );

describe('ErrorCatcher', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

  it('예측 가능한 에러인 경우 토스트가 표시된다.', async () => {
    const predictableErrorCode = 'EVENT_NOT_FOUND';
    const error = new RequestError({
      message: '서버의 에러메세지',
      name: predictableErrorCode,
      status: 200,
      endpoint: '',
      method: 'GET',
      requestBody: '',
      errorCode: predictableErrorCode,
    });

    const {updateAppError} = useAppErrorStore.getState();

    setup(<TestComponent triggerError={() => updateAppError(error)} />);

    act(() => {
      screen.getByText('Trigger Error').click();
    });

    const errorMessage = SERVER_ERROR_MESSAGES[predictableErrorCode];

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('핸들링 불가능한 에러인 경우 에러 바운더리가 표시된다.', async () => {
    const unPredictableErrorCode = '모르겠는 에러';
    const error = new RequestError({
      message: '모르겠는 에러메세지',
      name: unPredictableErrorCode,
      status: 400,
      endpoint: '',
      method: 'GET',
      requestBody: '',
      errorCode: unPredictableErrorCode,
    });

    const {updateAppError} = useAppErrorStore.getState();

    setup(<TestComponent triggerError={() => updateAppError(error)} />);

    act(() => {
      screen.getByText('Trigger Error').click();
    });

    await waitFor(() => {
      expect(screen.getByText('알 수 없는 오류가 발생했습니다.')).toBeInTheDocument();
    });
  });
});
