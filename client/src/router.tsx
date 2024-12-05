import {createBrowserRouter} from 'react-router-dom';
import {lazy, Suspense} from 'react';

import {ROUTER_URLS} from '@constants/routerUrls';

import App from './App';

const ErrorPage = lazy(() => import('@pages/ErrorPage/ErrorPage'));
const SendErrorPage = lazy(() => import('@pages/ErrorPage/SendErrorPage'));
const CreateGuestEventFunnel = lazy(() => import('@pages/CreateEventPage/CreateGuestEventPage/CreateGuestEventFunnel'));
const CreateMemberEventFunnel = lazy(
  () => import('@pages/CreateEventPage/CreateMemberEventPage/CreateMemberEventFunnel'),
);
const GuestEventLogin = lazy(() => import('@pages/EventPage/EventPageFallback/Login/GusetEventLogin'));
const MemberEventLogin = lazy(() => import('@pages/EventPage/EventPageFallback/Login/MemberEventLogin'));

const EventLoader = lazy(() => import('@components/Loader/EventLoader'));
const AuthGate = lazy(() => import('@pages/EventPage/AuthGate'));
const EventPage = lazy(() => import('@pages/EventPage/EventPageLayout'));
const SendPage = lazy(() => import('@pages/SendPage'));
const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const HomePage = lazy(() => import('@pages/EventPage/HomePage/HomePage'));
const AdminPage = lazy(() => import('@pages/EventPage/AdminPage/AdminPage'));
const AddBillFunnel = lazy(() => import('@pages/AddBillFunnel/AddBillFunnel'));
const EventMember = lazy(() => import('@pages/EventPage/AdminPage/EventMember'));
const EditBillPage = lazy(() => import('@pages/EditBillPage/EditBillPage'));
const Account = lazy(() => import('@pages/AccountPage/Account'));
const ImagesPage = lazy(() => import('@pages/ImagesPage/ImagesPage'));
const AddImagesPage = lazy(() => import('@pages/AddImagesPage/AddImagesPage'));
const EssentialQueryApp = lazy(() => import('./EssentialQueryApp'));
const QRCodePage = lazy(() => import('@pages/QRCodePage/QRCodePage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const MyPage = lazy(() => import('@pages/MyPage'));
const LoginRedirectPage = lazy(() => import('@pages/LoginPage/LoginRedirectPage'));
const LoginFailFallback = lazy(() => import('@pages/LoginPage/LoginFailFallback'));

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
        element: <EssentialQueryApp />,
        children: [
          {
            path: ROUTER_URLS.createGuestEvent,
            element: <CreateGuestEventFunnel />,
          },
          {
            path: ROUTER_URLS.createMemberEvent,
            element: <CreateMemberEventFunnel />,
          },
          {
            path: ROUTER_URLS.login,
            element: <LoginPage />,
          },
          {
            path: ROUTER_URLS.myPage,
            element: <MyPage />,
          },
          {
            path: ROUTER_URLS.kakaoLoginRedirectUri,
            element: <LoginRedirectPage />,
            errorElement: <LoginFailFallback />,
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
                element: (
                  <AuthGate>
                    <AdminPage />
                  </AuthGate>
                ),
              },
              {
                path: ROUTER_URLS.home,
                element: <HomePage />,
              },
              {
                path: ROUTER_URLS.guestEventLogin,
                element: <GuestEventLogin />,
              },
              {
                path: ROUTER_URLS.memberEventLogin,
                element: <MemberEventLogin />,
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
            path: ROUTER_URLS.send,
            element: <SendPage />,
            errorElement: <SendErrorPage />,
          },
          {
            path: ROUTER_URLS.qrCode,
            element: <QRCodePage />,
          },
        ],
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
