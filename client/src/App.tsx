import {Outlet} from 'react-router-dom';
import {Global} from '@emotion/react';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import AmplitudeInitializer from '@components/AmplitudeInitializer/AmplitudeInitializer';
import ErrorCatcher from '@components/AppErrorBoundary/ErrorCatcher';
import QueryClientBoundary from '@components/QueryClientBoundary/QueryClientBoundary';
import ToastContainer from '@components/Toast/ToastContainer';

import {HDesignProvider} from '@HDesign/index';

import NetworkStateCatcher from '@utils/NetworkStateCatcher';

import {GlobalStyle} from './GlobalStyle';
import UnPredictableErrorBoundary from './UnPredictableErrorBoundary';
console.log('cloudfront cache invalidation test');

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
            <AmplitudeInitializer>
              <Outlet />
            </AmplitudeInitializer>
          </QueryClientBoundary>
        </ErrorCatcher>
      </UnPredictableErrorBoundary>
    </HDesignProvider>
  );
};

export default App;
