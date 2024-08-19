import {render, screen, waitFor} from '@testing-library/react';
import {act, ReactNode} from 'react';
import {HDesignProvider} from 'haengdong-design';

import {useError} from '@hooks/useError/useError';

import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';

import UnhandledErrorBoundary from '../../UnhandledErrorBoundary';
import {ErrorInfo, ErrorProvider} from '../../hooks/useError/ErrorProvider'; // useError 경로에 맞게 설정

import {ToastProvider} from './ToastProvider'; // 위 코드에 해당하는 ToastProvider 경로

// 테스트용 헬퍼 컴포넌트
const TestComponent = ({errorInfo}: {errorInfo: ErrorInfo}) => {
  const {setErrorInfo} = useError();

  // 테스트에서 직접 에러를 설정합니다.
  const triggerError = () => {
    setErrorInfo(errorInfo);
  };

  return <button onClick={triggerError}>Trigger Error</button>;
};

const setup = (ui: ReactNode) =>
  render(
    <HDesignProvider>
      <UnhandledErrorBoundary>
        <ErrorProvider>
          <ToastProvider>{ui}</ToastProvider>
        </ErrorProvider>
      </UnhandledErrorBoundary>
    </HDesignProvider>,
  );

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useToast', () => {
  describe('error의 경우 자동으로 토스트를 띄워준다.', () => {
    it('핸들링 가능한 에러인 경우 토스트가 뜬다.', async () => {
      const errorCode = 'ACTION_NOT_FOUND';

      setup(
        <TestComponent
          errorInfo={{
            errorCode,
            message: '서버의 에러메세지',
          }}
        />,
      );
      const errorMessage = SERVER_ERROR_MESSAGES[errorCode];

      act(() => {
        // 에러 트리거 버튼을 클릭
        screen.getByText('Trigger Error').click();
      });

      // 토스트가 표시되는지 확인
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      // 타이머가 지나서 토스트가 사라지는지 확인
      jest.runAllTimers(); // Jest의 타이머를 실행
      await waitFor(() => {
        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
      });
    });

    it('핸들링 불가능한 에러인 경우 토스트가 안뜬다.', async () => {
      const errorCode = '핸들링이 안되는 에러 코드';

      setup(
        <TestComponent
          errorInfo={{
            errorCode,
            message: '핸들링이 안되는 에러 메세지',
          }}
        />,
      );

      act(() => {
        // 에러 트리거 버튼을 클릭
        screen.getByText('Trigger Error').click();
      });

      await waitFor(() => {
        expect(document.getElementById('toast')).not.toBeInTheDocument();
      });
    });
  });
});
