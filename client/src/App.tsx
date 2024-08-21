import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';
import {Global} from '@emotion/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {ToastProvider} from '@hooks/useToast/ToastProvider';
import {ErrorProvider} from '@hooks/useError/ErrorProvider';

import {GlobalStyle} from './GlobalStyle';
import UnhandledErrorBoundary from './UnhandledErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60, // 1 minute
    },
  },
});

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <UnhandledErrorBoundary>
          <Global styles={GlobalStyle} />
          <ErrorProvider>
            {/* <ErrorProvider callback={toast}> */}
            <ToastProvider>
              <Outlet />
            </ToastProvider>
          </ErrorProvider>
        </UnhandledErrorBoundary>
      </QueryClientProvider>
    </HDesignProvider>
  );
};

export default App;
