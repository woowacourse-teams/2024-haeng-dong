import {Outlet} from 'react-router-dom';

import useEventLoader from '@hooks/useEventLoader';

import EventDataProvider from './EventDataProvider';

const EventDataLoader = () => {
  const eventData = useEventLoader();

  return (
    <EventDataProvider {...eventData}>
      <Outlet />
    </EventDataProvider>
  );
};

export default EventDataLoader;
