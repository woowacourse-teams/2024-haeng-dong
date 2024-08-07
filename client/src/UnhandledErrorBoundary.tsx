import ErrorPage from '@pages/ErrorPage/ErrorPage';
import {StrictPropsWithChildren} from 'haengdong-design/dist/type/strictPropsWithChildren';
import {ErrorBoundary} from 'react-error-boundary';

const UnhandledErrorBoundary = ({children}: StrictPropsWithChildren) => {
  return <ErrorBoundary fallback={<ErrorPage />}>{children}</ErrorBoundary>;
};

export default UnhandledErrorBoundary;
