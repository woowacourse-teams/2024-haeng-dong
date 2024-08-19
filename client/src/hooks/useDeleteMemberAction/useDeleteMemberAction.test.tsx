import {renderHook, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {act} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {BillStep, MemberAction, MemberStep} from 'types/serviceType';
import {ErrorProvider} from '@hooks/useError/ErrorProvider';

import useRequestGetStepList from '@hooks/useRequestGetStepList';

import stepListJson from '@mocks/stepList.json';
import invalidMemberStepListJson from '@mocks/invalidMemberStepList.json';

import useDeleteMemberAction from './useDeleteMemberAction';

const stepListMockData = stepListJson as (BillStep | MemberStep)[];
let memberActionList: MemberAction[] = [];

// filter로는 type narrowing이 안되어 부득이하게 for 문을 사용했습니다.
for (let i = 0; i < stepListMockData.length; i++) {
  const curAction = stepListMockData[i];
  if (curAction.type !== 'BILL') curAction.actions.forEach(action => memberActionList.push(action));
}

describe('useDeleteMemberAction', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  const initializeProvider = (list: MemberAction[] = memberActionList) =>
    renderHook(
      () => {
        return {
          stepListResult: useRequestGetStepList(),
          deleteMemberActionList: useDeleteMemberAction({
            memberActionList: list,
            setIsBottomSheetOpened: () => {},
            showToastAlreadyExistMemberAction: () => {},
            showToastExistSameMemberFromAfterStep: () => {},
          }),
        };
      },
      {
        wrapper: ({children}) => (
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <ErrorProvider>{children}</ErrorProvider>
            </MemoryRouter>
          </QueryClientProvider>
        ),
      },
    );

  it('멤버를 삭제할 멤버 목록에 추가한다.', async () => {
    const {result} = initializeProvider();

    // stepList 값이 채워지길 대기합니다.
    await waitFor(() => {
      expect(result.current.stepListResult.data).not.toStrictEqual([]);
    });

    act(() => {
      const memberAction = {
        actionId: 1,
        name: '망쵸',
        price: null,
        sequence: 1,
      };

      result.current.deleteMemberActionList.addDeleteMemberAction(memberAction);
    });

    expect(result.current.deleteMemberActionList.aliveActionList).not.toContainEqual({
      actionId: 1,
      name: '망쵸',
      price: null,
      sequence: 1,
    });
  });

  it('삭제할 멤버 목록에 있는 멤버들을 모두 삭제해 삭제할 멤버 목록을 비운다.', async () => {
    const {result} = initializeProvider();

    // stepList 값이 채워지길 대기합니다.
    await waitFor(() => {
      expect(result.current.stepListResult.data).not.toStrictEqual([]);
    });

    await act(async () => {
      memberActionList.forEach(memberAction => {
        result.current.deleteMemberActionList.addDeleteMemberAction(memberAction);
      });
    });

    await act(async () => result.current.deleteMemberActionList.deleteMemberActionList());

    await waitFor(() => {
      expect(result.current.deleteMemberActionList.aliveActionList).toHaveLength(0);
    });
  });

  it('삭제 요청에서 오류가 발생했을 경우 삭제할 멤버 목록을 처음의 상태로 돌려놓는다.', async () => {
    /**
     * 이 테스트는 deleteMemberAction을 실행했을 때 오류가 나는 경우를 테스트하기 위해 작성되었습니다.
     * 여기서 사용하는 stepList 목데이터는 999 actionId를 가진 MemberAction이 있는 데이터입니다.
     * 999 actionId는 현재 모킹되어있는 msw에서 오류를 뱉도록 하는 id입니다. 이는 오류 상황을 시연하기 위한 임의 모킹입니다.
     * (999가 아닌 경우는 모두 정상 응답 반환)
     */

    // 999 actionId를 가진 MemberAction이 있는 stepListJson 데이터를 사용해 MemberActions []으로 정제합니다.
    const invalidMemberStepListMockData = invalidMemberStepListJson as (BillStep | MemberStep)[];
    let memberActionList: MemberAction[] = [];

    for (let i = 0; i < invalidMemberStepListMockData.length; i++) {
      const curAction = invalidMemberStepListMockData[i];
      if (curAction.type !== 'BILL') curAction.actions.forEach(action => memberActionList.push(action));
    }

    // 오류 멤버가 포함된 memberAction[]을 useDeleteMemberAction의 초기값으로 주입합니다.
    const {result} = initializeProvider(memberActionList);

    // stepList 값이 채워지길 대기합니다.
    await waitFor(() => {
      expect(result.current.stepListResult.data).not.toStrictEqual([]);
    });

    await act(async () => {
      const memberAction = memberActionList[0]; // 현재 0번 참여자는 actionId가 999 이고, 999 actionId는 서버에서 에러를 뱉도록 조작된 상황입니다.
      result.current.deleteMemberActionList.addDeleteMemberAction(memberAction);
    });

    await act(async () => result.current.deleteMemberActionList.deleteMemberActionList());

    // 삭제 요청에서 오류가 발생했기 때문에 aliveActionList를 초기에 주입했던 값으로 다시 돌려놓는지 확인합니다.
    expect(result.current.deleteMemberActionList.aliveActionList).toStrictEqual(memberActionList);
  });
});
