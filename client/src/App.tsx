import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';
import {Global} from '@emotion/react';

import {ToastProvider} from '@hooks/useToast/ToastProvider';

import {GlobalStyle} from './GlobalStyle';
import AppErrorBoundary from './AppErrorBoundary';
import QueryClientBoundary from './QueryClientBoundary';

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
