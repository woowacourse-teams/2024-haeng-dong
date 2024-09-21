import {Outlet} from 'react-router-dom';
import {Global} from '@emotion/react';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {ToastProvider} from '@hooks/useToast/ToastProvider';
import QueryClientBoundary from '@components/QueryClientBoundary/QueryClientBoundary';
import ErrorCatcher from '@components/AppErrorBoundary/ErrorCatcher';
import KakaoInitializer from '@components/KakaoInitializer/KakaoInitializer';

import {HDesignProvider} from '@HDesign/index';

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
              <KakaoInitializer>
                <Outlet />
              </KakaoInitializer>
            </QueryClientBoundary>
          </ErrorCatcher>
        </ToastProvider>
      </UnhandledErrorBoundary>
    </HDesignProvider>
  );
};

export default App;
