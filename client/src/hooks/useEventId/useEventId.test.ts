import useEventId from './useEventId';
import {renderHook} from '@testing-library/react';
import {useLocation} from 'react-router-dom';

// 모듈 전체를 모킹하지 않고, 각 테스트에서 useLocation만 모킹합니다.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(), // useLocation을 모킹
}));

describe('useEventId', () => {
  it('path에 있는 eventId를 반환한다.', () => {
    // 현재의 location path를 모킹합니다.
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/event/abc-123/',
    });

    const {result} = renderHook(() => useEventId());

    console.log(result.current.eventId);
    expect(result.current.eventId).toBe('abc-123');
  });

  it('path에 eventId가 없다면 빈 문자열을 반환한다.', () => {
    // 다른 경로로 useLocation을 모킹합니다.
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/no-event-id',
    });

    const {result} = renderHook(() => useEventId());

    console.log(result.current.eventId);
    expect(result.current.eventId).toBe('');
  });
});
