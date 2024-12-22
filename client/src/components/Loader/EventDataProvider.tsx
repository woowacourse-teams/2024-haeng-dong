import {createContext, PropsWithChildren} from 'react';

import {Event, EventId} from 'types/serviceType';

import {useAuthStore} from '@store/authStore';

type EventDataContextType = Event & {
  eventToken: EventId;
  isAdmin: boolean;
};

type EventDataProviderProps = PropsWithChildren<Omit<EventDataContextType, 'isAdmin'>>;

export const EventDataContext = createContext<EventDataContextType | null>(null);

const EventDataProvider = ({children, ...props}: EventDataProviderProps) => {
  const {isAdmin} = useAuthStore();

  return <EventDataContext.Provider value={{isAdmin, ...props}}>{children}</EventDataContext.Provider>;
};

export default EventDataProvider;
