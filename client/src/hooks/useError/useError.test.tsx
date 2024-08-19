// import {renderHook, waitFor} from '@testing-library/react';
// import {MemoryRouter} from 'react-router-dom';
// import {act} from 'react';
// import {HDesignProvider} from 'haengdong-design';

// import {SERVER_ERROR_MESSAGES} from '@constants/errorMessage';

// import UnhandledErrorBoundary from '../../UnhandledErrorBoundary';

// import {ErrorInfo, ErrorProvider} from './ErrorProvider';
// import {useError} from './useError';

// describe('useError', () => {
//   const initializeProvider = () =>
//     renderHook(() => useError(), {
//       wrapper: ({children}) => (
//         <HDesignProvider>
//           <UnhandledErrorBoundary>
//             <MemoryRouter>
//               <ErrorProvider>{children}</ErrorProvider>
//             </MemoryRouter>
//           </UnhandledErrorBoundary>
//         </HDesignProvider>
//       ),
//     });

//   /**
//    * useError, ErrorProvider, UnhandledErrorBoundary에서 사용되는 `핸들링 가능한 에러`의 정의
//    *
//    * : 서버에서 미리 정의한 에러 코드와 에러 메세지를 던져주는 경우 이를 `핸들링 가능한 에러`로 합니다.
//    * 다만 예외적으로 INTERNAL_SERVER_ERROR는 핸들링 `불가능`한 에러로 합니다.
//    */
//   const errorCode = 'EVENT_NOT_FOUND';
//   const errorInfo: ErrorInfo = {errorCode, message: '메세지입니다.'};
//   const expectedClientErrorMessage = SERVER_ERROR_MESSAGES[errorCode];

//   describe('저장된 에러를 초기화한다.', () => {
//     it('에러 초기화 함수에 인자를 넘겨주지 않은 경우 바로 에러를 초기화한다.', async () => {
//       const {result} = initializeProvider();

//       await act(async () => result.current.setErrorInfo(errorInfo));

//       // 에러 메세지가 세팅되기 까지 대기 (없어도 통과하나 제대로 값이 들어간 후 초기화됨을 확인하기 위함)
//       await waitFor(() => {
//         expect(result.current.clientErrorMessage).toEqual(expectedClientErrorMessage);
//       });

//       await act(async () => result.current.clearError());

//       await waitFor(() => expect(result.current.errorInfo).toBe(null));
//     });

//     it('저장된 에러가 없는데 초기화 함수를 호출할 경우 그냥 종료한다.', async () => {
//       const {result} = initializeProvider();

//       await act(async () => result.current.clearError());

//       await waitFor(() => expect(result.current.errorInfo).toBe(null));
//     });
//   });

//   describe('핸들링 가능한 에러', () => {
//     it('핸들링 가능한 에러인 경우 에러 메세지를 미리 정의된 에러 메세지로 세팅한다.', async () => {
//       const {result} = initializeProvider();

//       await act(async () => result.current.setErrorInfo(errorInfo));

//       await waitFor(() => expect(result.current.clientErrorMessage).toEqual(expectedClientErrorMessage));
//     });
//   });

//   describe('핸들링 불가능한 에러', () => {
//     it('에러 코드가 INTERNAL_SERVER_ERROR인 경우 핸들링 불가능한 에러로 판단하고 에러를 외부로 던진다.', async () => {
//       const {result} = initializeProvider();
//       const errorCode = 'INTERNAL_SERVER_ERROR';
//       const errorInfo: ErrorInfo = {errorCode, message: '서버 에러입니다.'};

//       await act(async () => {
//         try {
//           result.current.setErrorInfo(errorInfo);
//         } catch (error) {
//           expect(error).toBe(errorInfo);
//         }
//       });
//     });

//     it('에러 코드가 UNHANDLED인 경우 핸들링 불가능한 에러로 판단하고 에러를 외부로 던진다.', async () => {
//       const {result} = initializeProvider();
//       const errorCode = 'UNHANDLED';
//       const errorInfo: ErrorInfo = {errorCode, message: '알 수 없는 에러입니다.'};

//       await act(async () => {
//         try {
//           result.current.setErrorInfo(errorInfo);
//         } catch (error) {
//           expect(error).toBe(errorInfo);
//         }
//       });
//     });

//     it('에러 코드에 대응하는 에러메세지가 없는 에러인 경우 핸들링 불가능한 에러로 판단하고 에러를 외부로 던진다.', async () => {
//       const {result} = initializeProvider();
//       const errorCode = 'something strange error...';
//       const errorInfo: ErrorInfo = {errorCode, message: '정말 모르겠다.'};

//       await act(async () => {
//         try {
//           result.current.setErrorInfo(errorInfo);
//         } catch (error) {
//           expect(error).toBe(errorInfo);
//         }
//       });
//     });
//   });

//   it('Provider없이 useError를 사용할 경우 에러를 던진다.', () => {
//     expect(() => {
//       const _ = renderHook(() => useError());
//     }).toThrow('useError must be used within an ErrorProvider');
//   });
// });
