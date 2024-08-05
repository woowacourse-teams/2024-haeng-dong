import {Outlet} from 'react-router-dom';
import {HDesignProvider, ToastProvider} from 'haengdong-design';
import {Global} from '@emotion/react';

import {GlobalStyle} from './GlobalStyle';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <Global styles={GlobalStyle} />
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </HDesignProvider>
  );
};

export default App;
