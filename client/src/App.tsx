import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';
import {Global} from '@emotion/react';

import {ToastProvider} from '@hooks/useToast/ToastProvider';

import {GlobalStyle} from './GlobalStyle';
import AppErrorBoundary from '@components/AppErrorBoundary/AppErrorBoundary';
import QueryClientBoundary from '@components/QueryClientBoundary/QueryClientBoundary';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <Global styles={GlobalStyle} />
      <ToastProvider>
        <AppErrorBoundary>
          <QueryClientBoundary>
            <Outlet />
          </QueryClientBoundary>
        </AppErrorBoundary>
      </ToastProvider>
    </HDesignProvider>
  );
};

export default App;
