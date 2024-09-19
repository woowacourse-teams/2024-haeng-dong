// import type {MemberReportInAction} from 'types/serviceType';

// import {renderHook, waitFor, act} from '@testing-library/react';
// import {MemoryRouter} from 'react-router-dom';
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// import {billDetailsData} from '@mocks/sharedState';

// import useMemberReportListInAction from './useMemberReportListInAction';

// describe('useMemberReportListInActionTest', () => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: 0,
//       },
//     },
//   });

//   const initializeProvider = (actionId: number, totalPrice: number) =>
//     renderHook(() => useMemberReportListInAction(actionId, totalPrice, () => {}), {
//       wrapper: ({children}) => (
//         <QueryClientProvider client={queryClient}>
//           <MemoryRouter>{children}</MemoryRouter>
//         </QueryClientProvider>
//       ),
//     });

//   const actionId = 123;
//   const totalPrice = 100000;

//   describe('Flow: 유저가 정상적으로 값을 불러왔을 때의 test', () => {
//     it('초기값을 정상적으로 불러온다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       expect(result.current.memberReportListInAction).toStrictEqual(memberReportListInActionJson);
//     });

//     it('망쵸의 가격을 100원으로 바꾸면 망쵸의 가격은 100원으로 설정된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMember: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};
//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMember);
//       });

//       const targetMember = result.current.memberReportListInAction.find(member => member.name === '망쵸');

//       expect(targetMember?.price).toBe(100);
//     });

//     it('망쵸의 가격을 100원으로 바꾸면 망쵸의 가격은 100원으로 설정되고 나머지 인원의 가격이 33,300원으로 설정된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMember: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};
//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMember);
//       });

//       const targetMember = result.current.memberReportListInAction.find(member => member.name === '망쵸');
//       expect(targetMember?.price).toBe(100);

//       const anotherMemberList = result.current.memberReportListInAction.filter(member => member.name !== '망쵸');

//       anotherMemberList.forEach(member => {
//         expect(member.price).toBe(33300);
//       });
//     });

//     it('망쵸의 가격을 100원 쿠키의 가격을 100원으로 바꾸면 나머지 인원의 가격이 49,900원으로 설정된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};
//       const adjustedMemberCookie: MemberReportInAction = {name: '쿠키', price: 100, isFixed: true};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberCookie);
//       });

//       const anotherMemberList = result.current.memberReportListInAction.filter(
//         member => !(member.name === '망쵸' || member.name === '쿠키'),
//       );

//       anotherMemberList.forEach(member => {
//         expect(member.price).toBe(49900);
//       });
//     });

//     it('망쵸의 가격을 100원 쿠키의 가격을 100원으로 바꾸면 나머지 인원의 가격이 49,900원으로 설정된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};
//       const adjustedMemberCookie: MemberReportInAction = {name: '쿠키', price: 100, isFixed: false};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberCookie);
//       });

//       const anotherMemberList = result.current.memberReportListInAction.filter(
//         member => !(member.name === '망쵸' || member.name === '쿠키'),
//       );

//       anotherMemberList.forEach(member => {
//         expect(member.price).toBe(49900);
//       });
//     });

//     it('망쵸의 가격을 100원으로 바꾸고 다시 망쵸의 가격을 10,000원으로 바꾸면 나머지 인원의 가격이 30,000원으로 설정된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};
//       const adjustedMemberMangchoAfter: MemberReportInAction = {name: '망쵸', price: 10000, isFixed: true};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangchoAfter);
//       });

//       const anotherMemberList = result.current.memberReportListInAction.filter(member => member.name !== '망쵸');

//       anotherMemberList.forEach(member => {
//         expect(member.price).toBe(30000);
//       });
//     });
//   });

//   describe('예외 & 엣지케이스', () => {
//     it('동일한 인원의 가격을 동일하게 바꾸면 변함없다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       act(() => {
//         result.current.addAdjustedMember({...adjustedMemberMangcho, isFixed: true});
//       });

//       const anotherMemberList = result.current.memberReportListInAction.filter(member => member.name !== '망쵸');

//       expect(anotherMemberList[0].price).toBe(33300);
//     });

//     it('망쵸에게 300원을 주면 나머지 사람들은 33233원이고 마지막 사람은 33234원이 된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 300, isFixed: false};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       const targetMember = result.current.memberReportListInAction.find(member => member.name === '망쵸');
//       expect(targetMember?.price).toBe(300);

//       const anotherMemberList = result.current.memberReportListInAction.filter(
//         member => member.name === '이상' || member.name === '소하',
//       );

//       anotherMemberList.forEach(member => {
//         expect(member.price).toBe(33233);
//       });

//       const lastMember = result.current.memberReportListInAction.find(member => member.name === '쿠키');

//       expect(lastMember?.price).toBe(33234);
//     });

//     it('망쵸, 쿠키의 가격을 100원으로 바꾼 후 다시 쿠키의 가격을 33000원으로 바꾸면 쿠키의 isFixed는 false가 된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};
//       const adjustedMemberCookie: MemberReportInAction = {name: '쿠키', price: 100, isFixed: false};
//       const adjustedMemberCookieReset: MemberReportInAction = {name: '쿠키', price: 33300, isFixed: true};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberCookie);
//       });

//       const targetMember = result.current.memberReportListInAction.find(member => member.name === '쿠키');

//       expect(targetMember?.isFixed).toBe(true);

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberCookieReset);
//       });

//       const targetMemberReset = result.current.memberReportListInAction.find(member => member.name === '쿠키');

//       expect(targetMemberReset?.isFixed).toBe(false);
//     });

//     it('망쵸의 가격을 100원으로 바꾼 후 다시 망쵸의 가격을 25000원으로 바꾸면 망쵸의 isFixed는 false가 된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};
//       const adjustedMemberMangchoAfter: MemberReportInAction = {name: '망쵸', price: 25000, isFixed: true};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       const targetMember = result.current.memberReportListInAction.find(member => member.name === '망쵸');
//       expect(targetMember?.isFixed).toBe(true);

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangchoAfter);
//       });

//       const targetMemberReset = result.current.memberReportListInAction.find(member => member.name === '망쵸');
//       expect(targetMemberReset?.isFixed).toBe(false);
//     });

//     it('아무도 조정된 값이 없다면 조정값이 있는지 확인 결과 false다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       expect(result.current.isExistAdjustedPrice()).toBe(false);
//     });

//     it('망쵸의 가격을 100원으로 바꾼 후 리스트 중 조정값이 있는지 확인 결과 true다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       expect(result.current.isExistAdjustedPrice()).toBe(true);
//     });
//   });

//   describe('지출 인원이 2명인 상황', () => {
//     const actionId = 1;
//     const totalPrice = 50000;

//     // 망쵸 이상
//     it('망쵸의 가격을 100원으로 수정한 경우, 이상의 가격이 49900원으로 수정된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       const targetMember = result.current.memberReportListInAction.find(member => member.name === '이상');

//       expect(targetMember?.price).toBe(49900);
//     });

//     it('망쵸의 가격을 100원으로 수정하고 다시 200원으로 수정한 경우, 이상의 가격이 49800원으로 수정된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};
//       const adjustedMemberMangchoOther: MemberReportInAction = {name: '망쵸', price: 200, isFixed: true};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangchoOther);
//       });

//       const targetMember = result.current.memberReportListInAction.find(member => member.name === '이상');

//       expect(targetMember?.price).toBe(49800);
//     });
//   });

//   // last
//   describe('onSubmit 실행 시 반영 테스트', () => {
//     it('망쵸의 가격을 100원으로 바꾸고 저장하면 망쵸 100원이 반영된다.', async () => {
//       const {result} = initializeProvider(actionId, totalPrice);
//       const adjustedMemberMangcho: MemberReportInAction = {name: '망쵸', price: 100, isFixed: false};

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       act(() => {
//         result.current.addAdjustedMember(adjustedMemberMangcho);
//       });

//       await waitFor(() => {
//         result.current.onSubmit();
//       });

//       await waitFor(() => expect(result.current.queryResult.isSuccess).toBe(true));

//       const targetMember = result.current.memberReportListInAction.find(member => member.name === '망쵸');
//       expect(targetMember?.price).toBe(100);
//     });
//   });
// });
