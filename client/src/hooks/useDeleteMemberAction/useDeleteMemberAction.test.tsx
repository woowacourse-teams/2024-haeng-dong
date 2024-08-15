import {renderHook} from '@testing-library/react';
import StepListProvider, {useStepList} from '../useStepList';
import {MemoryRouter} from 'react-router-dom';
import useDeleteMemberAction from './useDeleteMemberAction';
import stepListJson from '../../mocks/memberActionStepList.json';
import {act} from 'react';
import {ErrorProvider} from '../../ErrorProvider';

const stepListMockData = stepListJson;
const memberActionList = stepListMockData[0].actions;

describe('useDeleteMemberAction', () => {
  const initializeProvider = () =>
    renderHook(
      () => {
        return {
          stepListResult: useStepList(),
          deleteMemberActionList: useDeleteMemberAction(memberActionList, () => {}),
        };
      },
      {
        wrapper: ({children}) => (
          <MemoryRouter>
            <ErrorProvider>
              <StepListProvider>{children}</StepListProvider>
            </ErrorProvider>
          </MemoryRouter>
        ),
      },
    );

  it('멤버를 삭제할 멤버 목록에 추가한다.', async () => {
    const {result} = initializeProvider();

    await act(async () => {
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

    await act(async () => {
      const memberAction1 = {
        actionId: 1,
        name: '망쵸',
        price: null,
        sequence: 1,
      };
      const memberAction2 = {
        actionId: 2,
        name: '백호',
        price: null,
        sequence: 2,
      };

      result.current.deleteMemberActionList.addDeleteMemberAction(memberAction1);
      result.current.deleteMemberActionList.addDeleteMemberAction(memberAction2);
    });

    await act(async () => result.current.deleteMemberActionList.deleteMemberActionList());

    expect(result.current.deleteMemberActionList.aliveActionList).toHaveLength(0);
  });
});
