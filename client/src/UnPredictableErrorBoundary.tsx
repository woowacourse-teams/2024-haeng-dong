import {ErrorBoundary} from 'react-error-boundary';

import {StrictPropsWithChildren} from '@type/strictPropsWithChildren';
import ErrorPage from '@pages/fallback/ErrorPage';

const UnPredictableErrorBoundary = ({children}: StrictPropsWithChildren) => {
  return <ErrorBoundary fallback={<ErrorPage />}>{children}</ErrorBoundary>;
};

export default UnPredictableErrorBoundary;
