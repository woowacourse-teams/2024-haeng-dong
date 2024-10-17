import {render, screen, waitFor} from '@testing-library/react';
import {act} from 'react';

import ToastContainer from '@components/Toast/ToastContainer';

import {HDesignProvider} from '@HDesign/index';

import toast from './toast';

const TOAST_MESSAGE = '테스트 메세지에요.';

// 테스트용 헬퍼 컴포넌트
const TestComponent = () => {
  const handleClick = () => {
    toast(TOAST_MESSAGE);
  };

  return <button onClick={handleClick}>Show Toast</button>;
};

const setup = () =>
  render(
    <HDesignProvider>
      <ToastContainer />
      <TestComponent />
    </HDesignProvider>,
  );

describe('ToastProvider', () => {
  it('토스트를 띄우고 자동으로 사라지게 한다', async () => {
    setup();

    // 토스트를 띄우기 위해 버튼 클릭
    act(() => {
      screen.getByText('Show Toast').click();
    });

    // 토스트 메시지가 나타나는지 확인
    expect(screen.getByText(TOAST_MESSAGE)).toBeInTheDocument();

    // 1초 후에 토스트 메시지가 사라지는지 확인
    await waitFor(
      () => {
        expect(screen.queryByText(TOAST_MESSAGE)).not.toBeInTheDocument();
      },
      {timeout: 3100},
    ); // 타임아웃을 3100ms로 설정하여 정확히 3초 후 확인
  });

  it('토스트를 누르면 사라진다', async () => {
    setup();

    // 토스트를 띄우기 위해 버튼 클릭
    act(() => {
      screen.getByText('Show Toast').click();
    });

    // 토스트 메시지가 나타나는지 확인
    expect(screen.getByText(TOAST_MESSAGE)).toBeInTheDocument();

    // 토스트의 닫기 버튼을 클릭
    act(() => {
      document.getElementById('toast')?.click();
    });

    // 닫기 버튼을 클릭한 후 토스트가 사라지는지 확인
    await waitFor(() => {
      expect(screen.queryByText(TOAST_MESSAGE)).not.toBeInTheDocument();
    });
  });
});
