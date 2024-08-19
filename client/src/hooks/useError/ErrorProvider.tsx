// import {useState, useEffect, createContext, ReactNode} from 'react';

// import {SERVER_ERROR_MESSAGES, UNKNOWN_ERROR} from '@constants/errorMessage';
// import {useAppErrorStore} from '@store/appErrorStore';
// import FetchError from '@errors/FetchError';
// import {captureError} from '@utils/captureError';
// import ErrorPage from '@pages/ErrorPage/ErrorPage';
// import {useToast} from '@hooks/useToast/useToast';
// import {ErrorBoundary} from 'react-error-boundary';

// export type ErrorInfo = {
//   errorCode: string;
//   message: string;
// };

// export interface ErrorContextType {
//   // clientErrorMessage: string;
//   // setErrorInfo: (error: ErrorInfo) => void;
//   // clearError: (ms?: number) => void;
//   // errorInfo: ErrorInfo | null;
//   setAppError: React.Dispatch<React.SetStateAction<Error | null>>;
// }

// export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// export const ErrorProvider = ({children}: React.PropsWithChildren) => {
//   const [appError, setAppError] = useState<Error | null>(null);
//   const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);
//   const {showToast} = useToast();

//   useEffect(() => {
//     const catchAppError = () => {
//       if (appError instanceof Error) {
//         const errorInfo =
//           appError instanceof FetchError ? appError.errorInfo : {errorCode: appError.name, message: appError.message};
//         setErrorInfo(errorInfo);
//         captureError(appError);
//       } else {
//         setErrorInfo({errorCode: UNKNOWN_ERROR, message: JSON.stringify(appError)});
//         captureError(new Error(UNKNOWN_ERROR));
//       }
//     };

//     if (appError) {
//       catchAppError();
//     }
//   }, [appError]);

//   useEffect(() => {
//     if (errorInfo) {
//       if (isUnhandledError(errorInfo.errorCode)) {
//         // 에러바운더리로 보내기
//         // throw new Error(errorInfo.message);
//       } else {
//         showToast({
//           showingTime: 3000,
//           message: errorInfo.message,
//           type: 'error',
//           position: 'bottom',
//           bottom: '8rem',
//         });
//       }
//     }
//   }, [errorInfo]);

//   const isUnhandledError = (errorCode: string) => {
//     if (errorCode === 'INTERNAL_SERVER_ERROR') return true;

//     return SERVER_ERROR_MESSAGES[errorCode] === undefined;
//   };

//   return <ErrorContext.Provider value={{setAppError}}>{children}</ErrorContext.Provider>;
// };
