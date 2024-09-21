import {ErrorBoundary} from 'react-error-boundary';

import {StrictPropsWithChildren} from '@type/strictPropsWithChildren';
import ErrorPage from '@pages/ErrorPage/ErrorPage';

const UnPredictableErrorBoundary = ({children}: StrictPropsWithChildren) => {
  return <ErrorBoundary fallback={<ErrorPage />}>{children}</ErrorBoundary>;
};

export default UnPredictableErrorBoundary;
