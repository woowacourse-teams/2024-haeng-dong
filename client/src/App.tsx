import {Outlet} from 'react-router-dom';
import {Global} from '@emotion/react';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {ToastProvider} from '@hooks/useToast/ToastProvider';
import QueryClientBoundary from '@components/QueryClientBoundary/QueryClientBoundary';
import ErrorCatcher from '@components/AppErrorBoundary/ErrorCatcher';

import {HDesignProvider} from '@HDesign/index';

import {GlobalStyle} from './GlobalStyle';
import UnPredictableErrorBoundary from './UnPredictableErrorBoundary';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <UnPredictableErrorBoundary>
        <Global styles={GlobalStyle} />
        <ToastProvider>
          <ErrorCatcher>
            <QueryClientBoundary>
              <ReactQueryDevtools initialIsOpen={false} />
              <Outlet />
            </QueryClientBoundary>
          </ErrorCatcher>
        </ToastProvider>
      </UnPredictableErrorBoundary>
    </HDesignProvider>
  );
};

export default App;
