import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';
import {Global} from '@emotion/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {ToastProvider} from '@hooks/useToast/ToastProvider';
import {ErrorProvider} from '@hooks/useError/ErrorProvider';

import {GlobalStyle} from './GlobalStyle';
import UnhandledErrorBoundary from './UnhandledErrorBoundary';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <QueryClientProvider client={queryClient}>
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
