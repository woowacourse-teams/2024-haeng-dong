import {Outlet} from 'react-router-dom';

import useEventLoader from '@hooks/useEventLoader';

import EventDataProvider from './EventDataProvider';

const EventLoader = () => {
  const eventData = useEventLoader();

  return (
    <>
      <EventDataProvider {...eventData}>
        <Outlet />
      </EventDataProvider>
    </>
  );
};

export default EventLoader;
