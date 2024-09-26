import {Outlet} from 'react-router-dom';

import {HDesignProvider} from '@components/Design/theme/useTheme';

const App: React.FC = () => {
  return (
    <>
      <HDesignProvider>
        {/* <UnPredictableErrorBoundary> */}
        {/* <Global styles={GlobalStyle} /> */}
        {/* <ErrorCatcher> */}
        {/* <QueryClientBoundary> */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* <NetworkStateCatcher /> */}
        {/* <ToastContainer /> */}
        {/* <KakaoInitializer> */}
        <Outlet />
        {/* </KakaoInitializer> */}
        {/* </QueryClientBoundary> */}
        {/* </ErrorCatcher> */}
        {/* </UnPredictableErrorBoundary> */}
      </HDesignProvider>
    </>
  );
};

export default App;
