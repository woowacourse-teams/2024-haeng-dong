import {Outlet} from 'react-router-dom';

import useEventLoader from '@hooks/useEventLoader';

import EventDataProvider from './EventDataProvider';

const EventDataLoader = () => {
  const eventData = useEventLoader();

  if (eventData.isFetching) {
    return null;
  }

  return (
    <EventDataProvider {...eventData}>
      <Outlet />
    </EventDataProvider>
  );
};

export default EventDataLoader;
