import {Outlet} from 'react-router-dom';
import {Global} from '@emotion/react';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import QueryClientBoundary from '@components/QueryClientBoundary/QueryClientBoundary';
import ErrorCatcher from '@components/AppErrorBoundary/ErrorCatcher';
import ToastContainer from '@components/Toast/ToastContainer';

import {HDesignProvider} from '@HDesign/index';

import {GlobalStyle} from './GlobalStyle';
import UnhandledErrorBoundary from './UnhandledErrorBoundary';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <UnhandledErrorBoundary>
        <Global styles={GlobalStyle} />
        <ToastContainer />
        <ErrorCatcher>
          <QueryClientBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
            <Outlet />
          </QueryClientBoundary>
        </ErrorCatcher>
      </UnhandledErrorBoundary>
    </HDesignProvider>
  );
};

export default App;
