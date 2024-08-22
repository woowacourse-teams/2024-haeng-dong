import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';
import {Global} from '@emotion/react';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {ToastProvider} from '@hooks/useToast/ToastProvider';
import QueryClientBoundary from '@components/QueryClientBoundary/QueryClientBoundary';
import ErrorCatcher from '@components/AppErrorBoundary/ErrorCatcher';

import {GlobalStyle} from './GlobalStyle';
import UnhandledErrorBoundary from './UnhandledErrorBoundary';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <UnhandledErrorBoundary>
        <Global styles={GlobalStyle} />
        <ToastProvider>
          <ErrorCatcher>
            <QueryClientBoundary>
              <ReactQueryDevtools initialIsOpen={false} />
              <Outlet />
            </QueryClientBoundary>
          </ErrorCatcher>
        </ToastProvider>
      </UnhandledErrorBoundary>
    </HDesignProvider>
  );
};

export default App;
