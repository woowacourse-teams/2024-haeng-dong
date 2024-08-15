import {renderHook, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {act} from 'react';

import {Bill} from 'types/serviceType';

import StepListProvider, {useStepList} from '../useStepList/useStepList';
import stepListJson from '../../mocks/stepList.json';
import {ErrorProvider} from '../../ErrorProvider';

const stepListMockData = stepListJson;

describe('useStepList', () => {
  const initializeProvider = () =>
    renderHook(
      () => {
        return {
          stepListResult: useStepList(),
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

  const getMemberNameList = () =>
    stepListJson
      .filter(({type}) => type !== 'BILL')
      .map(({actions}) => actions.map(({name}) => name))
      .flat();

  it('처음 호출하면 stepList 값을 요청해 받아온다.', async () => {
    const {result} = initializeProvider();

    await waitFor(() => expect(result.current.stepListResult.stepList).toEqual(stepListMockData));
  });

  it('처음 호출하면 모든 멤버의 목록을 요청해 받아온다.', async () => {
    const {result} = initializeProvider();
    const allMemberList = getMemberNameList();

    await waitFor(() => expect(result.current.stepListResult.allMemberList).toEqual(allMemberList));
  });

  it('지출 내역의 총액을 계산한다.', async () => {
    const {result} = initializeProvider();
    const totalPrice = stepListJson.reduce((sum, {type, actions}) => {
      if (type === 'BILL') {
        return sum + actions.reduce((sum, {price}) => sum + price!, 0);
      }
      return sum;
    }, 0);

    // 값이 세팅되기까지 대기하기 위함. 그래서 아래 한 줄 없으면 에러남
    await waitFor(() => expect(result.current.stepListResult.stepList).toEqual(stepListMockData));

    expect(result.current.stepListResult.getTotalPrice()).toEqual(totalPrice);
  });

  it('들어옴 멤버를 추가한다.', async () => {
    const {result} = initializeProvider();
    const type = 'IN';
    const memberNameList = ['망고젤리', '리치젤리'];

    const prevNameList = getMemberNameList();
    const updatedNameList = [...prevNameList, ...memberNameList];

    await act(async () => result.current.stepListResult.updateMemberList({type, memberNameList}));

    expect(result.current.stepListResult.allMemberList).toStrictEqual(updatedNameList);
  });

  it('지출 내역을 새로 추가한다.', async () => {
    const {result} = initializeProvider();
    const billList: Bill[] = [
      {title: '마라', price: 20000},
      {title: '엽떡', price: 1000},
    ];

    const updatedStepList = [
      ...stepListJson,
      {
        type: 'BILL',
        stepName: '밥스카이',
        members: [],
        actions: billList.map(({title, price}) => ({
          actionId: 999,
          name: title,
          price,
          sequence: 999,
        })),
      },
    ];

    await act(async () => result.current.stepListResult.addBill(billList, () => {}));

    expect(result.current.stepListResult.stepList).toEqual(updatedStepList);
  });

  it('provider안에서 호출되지 않으면 에러를 던진다.', () => {
    expect(() => {
      const {result} = renderHook(() => useStepList());
    }).toThrow('useStepList는 StepListProvider 내에서 사용되어야 합니다.');
  });
});
