import {createBrowserRouter} from 'react-router-dom';
import {ROUTER_URLS} from '@constants/routerUrls';
import {MainPage} from '@pages/Main';
import {EventPage} from '@pages/Event';
import {HomePage} from '@pages/Home';

import App from './App';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        index: true,
        path: ROUTER_URLS.main,
        element: <MainPage />,
      },
      {
        path: ROUTER_URLS.eventManage,
        element: <EventPage />,
      },
      {
        path: ROUTER_URLS.home,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
