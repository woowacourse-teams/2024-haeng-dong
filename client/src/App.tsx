import {Outlet} from 'react-router-dom';
import {Global} from '@emotion/react';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import QueryClientBoundary from '@components/QueryClientBoundary/QueryClientBoundary';
import ErrorCatcher from '@components/AppErrorBoundary/ErrorCatcher';
import ToastContainer from '@components/Toast/ToastContainer';
import KakaoInitializer from '@components/KakaoInitializer/KakaoInitializer';

import {HDesignProvider} from '@HDesign/index';

import NetworkStateCatcher from '@utils/NetworkStateCatcher';

import {GlobalStyle} from './GlobalStyle';
import UnPredictableErrorBoundary from './UnPredictableErrorBoundary';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <UnPredictableErrorBoundary>
        <Global styles={GlobalStyle} />
        <ErrorCatcher>
          <QueryClientBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
            <NetworkStateCatcher />
            <ToastContainer />
            <KakaoInitializer>
              <Outlet />
            </KakaoInitializer>
          </QueryClientBoundary>
        </ErrorCatcher>
      </UnPredictableErrorBoundary>
    </HDesignProvider>
  );
};

export default App;
