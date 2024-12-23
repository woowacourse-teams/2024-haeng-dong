import {Outlet} from 'react-router-dom';

import useEventPageLoader from '@hooks/useEventPageLoader';

import EventDataProvider from './EventDataProvider';

const EventDataLoader = () => {
  const eventData = useEventPageLoader();

  return (
    <EventDataProvider {...eventData}>
      <Outlet />
    </EventDataProvider>
  );
};

export default EventDataLoader;
