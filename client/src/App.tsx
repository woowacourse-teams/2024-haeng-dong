import {Outlet} from 'react-router-dom';
import {Global} from '@emotion/react';

import AmplitudeInitializer from '@components/AmplitudeInitializer/AmplitudeInitializer';

import {HDesignProvider} from '@HDesign/index';

import NetworkStateCatcher from '@utils/NetworkStateCatcher';

import {GlobalStyle} from './GlobalStyle';
import UnPredictableErrorBoundary from './UnPredictableErrorBoundary';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <UnPredictableErrorBoundary>
        <Global styles={GlobalStyle} />
        <NetworkStateCatcher />
        <AmplitudeInitializer>
          <Outlet />
        </AmplitudeInitializer>
      </UnPredictableErrorBoundary>
    </HDesignProvider>
  );
};

export default App;
