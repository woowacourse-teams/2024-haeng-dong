import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';
import {Global} from '@emotion/react';

import {GlobalStyle} from './GlobalStyle';
import {toastConfig} from 'react-simple-toasts';
import {ErrorProvider} from './ErrorProvider';
import {ToastProvider} from '@components/Toast/ToastProvider';

toastConfig({theme: 'dark'});

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <Global styles={GlobalStyle} />
      <ErrorProvider>
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </ErrorProvider>
    </HDesignProvider>
  );
};

export default App;
