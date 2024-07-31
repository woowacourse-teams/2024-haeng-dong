import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';
import {Global} from '@emotion/react';

import {GlobalStyle} from './GlobalStyle';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <Global styles={GlobalStyle} />
      <Outlet />
    </HDesignProvider>
  );
};

export default App;
