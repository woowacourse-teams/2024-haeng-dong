import {createBrowserRouter} from 'react-router-dom';

import {AdminPage} from '@pages/EventPage/AdminPage';
import {HomePage} from '@pages/EventPage/HomePage';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import EventLoginPage from '@pages/EventPage/AdminPage/EventLoginPage';
import Account from '@pages/Account/Account';
import AddBillFunnel from '@pages/BillPage/AddBillFunnel';

import {CompleteCreateEventPage, SetEventNamePage, SetEventPasswordPage} from '@pages/CreateEventPage';
import {MainPage} from '@pages/MainPage';
import {EventPage} from '@pages/EventPage';

import {ROUTER_URLS} from '@constants/routerUrls';

import App from './App';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: 'cookie',
        element: <Account />,
      },
      {
        index: true,
        path: ROUTER_URLS.main,
        element: <MainPage />,
      },
      {
        path: ROUTER_URLS.eventCreateName,
        element: <SetEventNamePage />,
      },
      {
        path: ROUTER_URLS.eventCreatePassword,
        element: <SetEventPasswordPage />,
      },
      {
        path: ROUTER_URLS.eventCreateComplete,
        element: <CompleteCreateEventPage />,
      },
      {
        path: ROUTER_URLS.event,
        element: <EventPage />,
        children: [
          {path: ROUTER_URLS.eventManage, element: <AdminPage />},
          {path: ROUTER_URLS.home, element: <HomePage />},
          {
            path: ROUTER_URLS.eventLogin,
            element: <EventLoginPage />,
          },
        ],
      },
      {
        path: ROUTER_URLS.addBill,
        element: <AddBillFunnel />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
