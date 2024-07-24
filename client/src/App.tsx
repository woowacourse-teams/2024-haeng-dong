import {HDesignProvider} from 'haengdong-design';
import {Outlet} from 'react-router-dom';
import {HDesignProvider} from 'haengdong-design';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <Outlet />
    </HDesignProvider>
  );
};

export default App;
