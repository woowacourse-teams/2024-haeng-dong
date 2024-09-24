import {createBrowserRouter} from 'react-router-dom';

import AddBillFunnel from '@pages/AddBillFunnel/AddBillFunnel';
import {AdminPage} from '@pages/EventPage/AdminPage';
import {HomePage} from '@pages/EventPage/HomePage';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import EventLoginPage from '@pages/EventPage/AdminPage/EventLoginPage';
import CreateEventFunnel from '@pages/CreateEventPage/CreateEventFunnel';
import Account from '@pages/AccountPage/Account';

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
        index: true,
        path: ROUTER_URLS.main,
        element: <MainPage />,
      },
      {
        path: ROUTER_URLS.createEvent,

        element: <CreateEventFunnel />,
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
        path: ROUTER_URLS.eventEdit,
        element: <Account />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
