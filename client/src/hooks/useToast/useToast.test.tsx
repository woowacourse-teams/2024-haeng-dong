import {render, renderHook, screen, waitFor} from '@testing-library/react';
import {act} from 'react';
import {HDesignProvider} from 'haengdong-design';

import {ToastProvider} from './ToastProvider';
import {useToast} from './useToast';

const TOAST_CONFIG = {
  message: 'Test Toast Message',
};

// 테스트용 컴포넌트: 토스트를 표시하기 위한 버튼 제공
const TestComponent = () => {
  const {showToast} = useToast();

  const handleClick = () => {
    showToast(TOAST_CONFIG);
  };

  return <button onClick={handleClick}>Show Toast</button>;
};

const setup = () =>
  render(
    <HDesignProvider>
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
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
    expect(screen.getByText(TOAST_CONFIG.message)).toBeInTheDocument();

    // 1초 후에 토스트 메시지가 사라지는지 확인
    await waitFor(
      () => {
        expect(screen.queryByText(TOAST_CONFIG.message)).not.toBeInTheDocument();
      },
      {timeout: 3100},
    ); // 타임아웃을 3100ms로 설정하여 정확히 3초 후 확인
  });

  it('토스트 닫기 버튼을 눌렀을 때 사라진다', async () => {
    setup();

    // 토스트를 띄우기 위해 버튼 클릭
    act(() => {
      screen.getByText('Show Toast').click();
    });

    // 토스트 메시지가 나타나는지 확인
    expect(screen.getByText(TOAST_CONFIG.message)).toBeInTheDocument();

    // 토스트의 닫기 버튼을 클릭
    act(() => {
      document.getElementById('toast')?.click();
    });

    // 닫기 버튼을 클릭한 후 토스트가 사라지는지 확인
    await waitFor(() => {
      expect(screen.queryByText(TOAST_CONFIG.message)).not.toBeInTheDocument();
    });
  });

  it('Provider없이 useToast 사용할 경우 에러를 던진다.', () => {
    expect(() => {
      const _ = renderHook(() => useToast());
    }).toThrow('useToast는 ToastProvider 내에서 사용되어야 합니다.');
  });
});
