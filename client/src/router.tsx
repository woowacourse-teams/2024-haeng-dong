import {createBrowserRouter, Navigate} from 'react-router-dom';
import {lazy, Suspense} from 'react';

import {ROUTER_URLS} from '@constants/routerUrls';

import App from './App';

const ErrorPage = lazy(() => import('@pages/fallback/ErrorPage'));
const SendErrorPage = lazy(() => import('@pages/fallback/SendErrorPage'));
const CreateGuestEventFunnel = lazy(() => import('@pages/event/create/guest/CreateGuestEventFunnel'));
const CreateUserEventFunnel = lazy(() => import('@pages/event/create/user/CreateUserEventFunnel'));
const GuestEventLogin = lazy(() => import('@pages/event/[eventId]/admin/login/guest/GuestEventLogin'));
const MemberEventLogin = lazy(() => import('@pages/event/[eventId]/admin/login/user/UserEventLogin'));

const EventLoader = lazy(() => import('@components/Loader/EventLoader'));
const AuthGate = lazy(() => import('@pages/event/[eventId]/admin/AuthGate'));
const EventPage = lazy(() => import('@pages/event/[eventId]/EventPageLayout'));
const SendPage = lazy(() => import('@pages/event/[eventId]/home/send/[memberId]/SendPage'));
const MainPage = lazy(() => import('@pages/main/MainPage'));
const HomePage = lazy(() => import('@pages/event/[eventId]/home/HomePage'));
const AdminPage = lazy(() => import('@pages/event/[eventId]/admin/AdminPage'));
const AddBillFunnel = lazy(() => import('@pages/event/[eventId]/admin/add-bill/AddBillFunnel'));
const MembersPage = lazy(() => import('@pages/event/[eventId]/admin/members/MembersPage'));
const EditBillPage = lazy(() => import('@pages/event/[eventId]/admin/edit-bill/EditBillPage'));
const EditAccountPage = lazy(() => import('@pages/event/[eventId]/admin/edit-account/EditAccountPage'));
const ImagesPage = lazy(() => import('@pages/event/[eventId]/images/ImagesPage'));
const AddImagesPage = lazy(() => import('@pages/event/[eventId]/admin/add-images/AddImagesPage'));
const QRCodePage = lazy(() => import('@pages/event/[eventId]/qrcode/QRCodePage'));
const LoginPage = lazy(() => import('@pages/login/LoginPage'));
const MyPage = lazy(() => import('@pages/mypage/MyPage'));
const LoginRedirectPage = lazy(() => import('@pages/login/LoginRedirectPage'));
const LoginFailFallback = lazy(() => import('@pages/login/LoginFailFallback'));
const CreatedEventsPage = lazy(() => import('@pages/mypage/events/CreatedEventsPage'));
const EventPageLoading = lazy(() => import('@pages/fallback/EventPageLoading'));
const WithdrawPage = lazy(() => import('@pages/mypage/withdraw/WithdrawPage'));

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
        path: ROUTER_URLS.createGuestEvent,
        element: <CreateGuestEventFunnel />,
      },
      {
        path: ROUTER_URLS.createUserEvent,
        element: <CreateUserEventFunnel />,
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
        path: ROUTER_URLS.withdraw,
        element: <WithdrawPage />,
      },
      {
        path: ROUTER_URLS.createdEvents,
        element: <CreatedEventsPage />,
      },
      {
        path: ROUTER_URLS.kakaoLoginRedirectUri,
        element: <LoginRedirectPage />,
        errorElement: <LoginFailFallback />,
      },
      {
        path: ROUTER_URLS.event,
        element: (
          <Suspense fallback={<EventPageLoading />}>
            <EventLoader>
              <EventPage />
            </EventLoader>
          </Suspense>
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
            path: ROUTER_URLS.userEventLogin,
            element: <MemberEventLogin />,
          },
        ],
      },
      {
        path: ROUTER_URLS.addBill,
        element: <AddBillFunnel />,
      },
      {
        path: ROUTER_URLS.members,
        element: <MembersPage />,
      },
      {
        path: ROUTER_URLS.editBill,
        element: <EditBillPage />,
      },
      {
        path: ROUTER_URLS.editAccount,
        element: <EditAccountPage />,
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
]);

export default router;
