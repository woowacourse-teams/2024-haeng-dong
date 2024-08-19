import type {MemberReport} from 'types/serviceType';

import {renderHook, waitFor, act} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import memberReportListInActionJson from '../../mocks/memberReportListInAction.json';
import {ErrorProvider} from '../useError/ErrorProvider';

import useMemberReportListInAction from './useMemberReportListInAction';

describe('useMemberReportListInActionTest', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  const initializeProvider = (actionId: number, totalPrice: number) =>
    renderHook(() => useMemberReportListInAction(actionId, totalPrice), {
      wrapper: ({children}) => (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ErrorProvider>{children}</ErrorProvider>
          </MemoryRouter>
        </QueryClientProvider>
      ),
    });

  const actionId = 123;
  const totalPrice = 100000;

  describe('Flow: 유저가 정상적으로 값을 불러왔을 때의 test', () => {
    it('초기값을 정상적으로 불러온다.', async () => {
      const {result} = initializeProvider(actionId, totalPrice);

      await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

      expect(result.current.memberReportListInAction).toStrictEqual(memberReportListInActionJson);
    });

    it('망쵸의 가격을 100원으로 바꾸면 망쵸의 가격은 100원으로 설정된다.', async () => {
      const {result} = initializeProvider(actionId, totalPrice);
      const adjustedMember: MemberReport = {name: '망쵸', price: 100};
      await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

      act(() => {
        result.current.addAdjustedMember(adjustedMember);
      });

      const targetMember = result.current.memberReportListInAction.find(member => member.name === '망쵸');

      expect(targetMember?.price).toBe(100);
    });

    it('망쵸의 가격을 100원으로 바꾸면 망쵸의 가격은 100원으로 설정되고 나머지 인원의 가격이 33,300원으로 설정된다.', async () => {
      const {result} = initializeProvider(actionId, totalPrice);
      const adjustedMember: MemberReport = {name: '망쵸', price: 100};
      await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

      act(() => {
        result.current.addAdjustedMember(adjustedMember);
      });

      const targetMember = result.current.memberReportListInAction.find(member => member.name === '망쵸');
      expect(targetMember?.price).toBe(100);

      const anotherMemberList = result.current.memberReportListInAction.filter(member => member.name !== '망쵸');

      anotherMemberList.forEach(member => {
        expect(member.price).toBe(33300);
      });
    });

    it('망쵸의 가격을 100원 쿠키의 가격을 100원으로 바꾸면 나머지 인원의 가격이 49,900원으로 설정된다.', async () => {
      const {result} = initializeProvider(actionId, totalPrice);
      const adjustedMemberMangcho: MemberReport = {name: '망쵸', price: 100};
      const adjustedMemberCookie: MemberReport = {name: '쿠키', price: 100};

      await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

      act(() => {
        result.current.addAdjustedMember(adjustedMemberMangcho);
      });

      act(() => {
        result.current.addAdjustedMember(adjustedMemberCookie);
      });

      const anotherMemberList = result.current.memberReportListInAction.filter(
        member => !(member.name === '망쵸' || member.name === '쿠키'),
      );

      anotherMemberList.forEach(member => {
        expect(member.price).toBe(49900);
      });
    });

    it('망쵸의 가격을 100원으로 바꾸고 저장하면 망쵸 100원이 반영된다.', async () => {
      const {result} = initializeProvider(actionId, totalPrice);
      const adjustedMemberMangcho: MemberReport = {name: '망쵸', price: 100};

      await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

      act(() => {
        result.current.addAdjustedMember(adjustedMemberMangcho);
      });

      await waitFor(() => {
        result.current.onSubmit();
      });

      await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

      const targetMember = result.current.memberReportListInAction.find(member => member.name === '망쵸');
      expect(targetMember?.price).toBe(100);
    });
  });
});
