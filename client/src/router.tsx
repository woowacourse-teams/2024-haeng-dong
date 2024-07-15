import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import {ROUTER_URLS} from './constants/routerUrls';
import {MainPage} from './pages/Main';
import {CreateEventPage} from './pages/CreateEvent';
import {CompleteCreateEventPage} from './pages/CompleteCreateEvent';
import {EventPage} from './pages/Event';

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
        element: <CreateEventPage />,
      },
      {
        path: ROUTER_URLS.completeCreateEvent,
        element: <CompleteCreateEventPage />,
      },
      {
        path: ROUTER_URLS.eventManage,
        element: <EventPage />,
      },
    ],
  },
]);

export default router;
