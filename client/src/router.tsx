import {createBrowserRouter} from 'react-router-dom';

import {MainPage} from '@pages/Main';
import {CreateNamePage, CreateCompletePage} from '@pages/Create';
import {EventPage} from '@pages/Event';
import {HomePage} from '@pages/Home';

import {ROUTER_URLS} from '@constants/routerUrls';

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
        path: ROUTER_URLS.eventCreateName,
        element: <CreateNamePage />,
      },
      {
        path: ROUTER_URLS.eventCreateComplete,
        element: <CreateCompletePage />,
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
