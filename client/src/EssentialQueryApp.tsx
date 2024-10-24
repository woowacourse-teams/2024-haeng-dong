import {Outlet} from 'react-router-dom';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import QueryClientBoundary from '@components/QueryClientBoundary/QueryClientBoundary';
import ErrorCatcher from '@components/AppErrorBoundary/ErrorCatcher';
import ToastContainer from '@components/Toast/ToastContainer';

const EssentialQueryApp: React.FC = () => {
  return (
    <ErrorCatcher>
      <QueryClientBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
        <Outlet />
      </QueryClientBoundary>
    </ErrorCatcher>
  );
};

export default EssentialQueryApp;
