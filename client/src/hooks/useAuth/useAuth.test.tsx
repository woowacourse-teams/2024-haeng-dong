// import {renderHook, waitFor} from '@testing-library/react';
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {act} from 'react';
// import {MemoryRouter} from 'react-router-dom';

// import {useError} from '@hooks/useError/useError';

// import {PASSWORD_LENGTH} from '@constants/password';

// import {VALID_PASSWORD_FOR_TEST, VALID_TOKEN_FOR_TEST} from '@mocks/validValueForTest';

// import {ErrorProvider} from '../useError/ErrorProvider';

// import useAuth from './useAuth';

// describe('useAuth', () => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: 0,
//       },
//     },
//   });
//   const initializeProvider = () =>
//     renderHook(
//       () => {
//         return {errorResult: useError(), authResult: useAuth()};
//       },
//       {
//         wrapper: ({children}) => (
//           <QueryClientProvider client={queryClient}>
//             <MemoryRouter>
//               <ErrorProvider>{children}</ErrorProvider>
//             </MemoryRouter>
//           </QueryClientProvider>
//         ),
//       },
//     );

//   describe('auth', () => {
//     it('쿠키에 토큰이 담겨있지 않다면 인증이 실패한다', async () => {
//       const {result} = initializeProvider();

//       await act(async () => {
//         expect(await result.current.authResult.checkAuthentication());
//       });

//       await waitFor(() => {
//         expect(result.current.errorResult.errorInfo?.errorCode).toBe('TOKEN_NOT_FOUND');
//       });
//     });

//     it('쿠키에 담겨있는 토큰이 올바르다면 인증에 성공한다', async () => {
//       document.cookie = `eventToken=${VALID_TOKEN_FOR_TEST}`;

//       const {result} = initializeProvider();

//       await act(async () => {
//         expect(await result.current.authResult.checkAuthentication());
//       });

//       await waitFor(() => {
//         expect(result.current.errorResult.errorInfo).toBe(null);
//       });
//     });

//     it('쿠키에 담겨있는 토큰이 유효하지 않다면 인증에 실패한다.', async () => {
//       document.cookie = 'eventToken=fake-token';

//       const {result} = initializeProvider();

//       await act(async () => {
//         expect(await result.current.authResult.checkAuthentication());
//       });

//       await waitFor(() => {
//         expect(result.current.errorResult.errorInfo?.errorCode).toBe('TOKEN_INVALID');
//       });
//     });

//     it('쿠키에 담겨있는 토큰이 만료되었다면 인증에 실패한다.', async () => {
//       document.cookie = 'eventToken=expired-token';

//       const {result} = initializeProvider();

//       await act(async () => {
//         expect(await result.current.authResult.checkAuthentication());
//       });

//       await waitFor(() => {
//         expect(result.current.errorResult.errorInfo?.errorCode).toBe('TOKEN_EXPIRED');
//       });
//     });

//     it('쿠키에 담겨있는 토큰이 forbidden이라면 인증에 실패한다.', async () => {
//       document.cookie = 'eventToken=forbidden-token';

//       const {result} = initializeProvider();

//       await act(async () => {
//         expect(await result.current.authResult.checkAuthentication());
//       });

//       await waitFor(() => {
//         expect(result.current.errorResult.errorInfo?.errorCode).toBe('FORBIDDEN');
//       });
//     });
//   });

//   describe('login', () => {
//     it('비밀 번호가 올바르다면 로그인이 성공한다.', async () => {
//       const {result} = initializeProvider();

//       await act(async () => {
//         expect(await result.current.authResult.loginUser({password: String(VALID_PASSWORD_FOR_TEST)}));
//       });

//       await waitFor(() => {
//         expect(result.current.errorResult.errorInfo).toBe(null);
//       });
//     });

//     it(`비밀 번호가 ${PASSWORD_LENGTH}자리가 아니라면 로그인에 실패한다.`, async () => {
//       const {result} = initializeProvider();

//       await act(async () => {
//         expect(await result.current.authResult.loginUser({password: '111'}));
//       });

//       await waitFor(() => {
//         expect(result.current.errorResult.errorInfo?.errorCode).toBe('EVENT_PASSWORD_FORMAT_INVALID');
//       });
//     });

//     it('비밀 번호가 틀렸다면 로그인에 실패한다.', async () => {
//       const {result} = initializeProvider();

//       await act(async () => {
//         expect(await result.current.authResult.loginUser({password: '9999'}));
//       });

//       await waitFor(() => {
//         expect(result.current.errorResult.errorInfo?.errorCode).toBe('PASSWORD_INVALID');
//       });
//     });
//   });
// });
