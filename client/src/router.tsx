import {createBrowserRouter} from 'react-router-dom';
import {lazy, Suspense} from 'react';

import ErrorPage from '@pages/ErrorPage/ErrorPage';
import EventLoginPage from '@pages/EventPage/AdminPage/EventLoginPage';
import EventLoader from '@components/Loader/EventLoader';

import {EventPage} from '@pages/EventPage';

import {ROUTER_URLS} from '@constants/routerUrls';

import App from './App';

const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const HomePage = lazy(() => import('@pages/EventPage/HomePage/HomePage'));
const CreateEventFunnel = lazy(() => import('@pages/CreateEventPage/CreateEventFunnel'));
const AdminPage = lazy(() => import('@pages/EventPage/AdminPage/AdminPage'));
const AddBillFunnel = lazy(() => import('@pages/AddBillFunnel/AddBillFunnel'));
const EventMember = lazy(() => import('@pages/EventPage/AdminPage/EventMember'));
const EditBillPage = lazy(() => import('@pages/EditBillPage/EditBillPage'));
const Account = lazy(() => import('@pages/AccountPage/Account'));
const ImagesPage = lazy(() => import('@pages/ImagesPage/ImagesPage'));
const AddImagesPage = lazy(() => import('@pages/AddImagesPage/AddImagesPage'));

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
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
        element: (
          <EventLoader>
            <EventPage />
          </EventLoader>
        ),
        children: [
          {
            path: ROUTER_URLS.eventManage,
            element: <AdminPage />,
          },
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
        path: ROUTER_URLS.member,
        element: <EventMember />,
      },
      {
        path: ROUTER_URLS.editBill,
        element: <EditBillPage />,
      },
      {
        path: ROUTER_URLS.eventEdit,
        element: <Account />,
      },
      {
        path: ROUTER_URLS.images,
        element: <ImagesPage />,
      },
      {
        path: ROUTER_URLS.addImages,
        element: <AddImagesPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
