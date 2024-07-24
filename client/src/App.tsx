import {HDesignProvider} from 'haengdong-design';
import {Outlet} from 'react-router-dom';

const App: React.FC = () => {
  return (
    <HDesignProvider>
      <Outlet />
    </HDesignProvider>
  );
};

export default App;
