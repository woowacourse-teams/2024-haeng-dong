import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';
import {Global} from '@emotion/react';

import {GlobalStyle} from './GlobalStyle';
// import toast from 'react-simple-toasts';
import {ErrorProvider} from './ErrorProvider';
import {ToastProvider} from '@components/Toast/ToastProvider';
import UnhandledErrorBoundary from './UnhandledErrorBoundary';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <UnhandledErrorBoundary>
        <Global styles={GlobalStyle} />
        <ErrorProvider>
          {/* <ErrorProvider callback={toast}> */}
          <ToastProvider>
            <Outlet />
          </ToastProvider>
        </ErrorProvider>
      </UnhandledErrorBoundary>
    </HDesignProvider>
  );
};

export default App;
