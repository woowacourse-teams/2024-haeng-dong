import {createContext, PropsWithChildren} from 'react';

import useEventLoader from '@hooks/useEventLoader';

import {useAuthStore} from '@store/authStore';

type EventDataContextType = ReturnType<typeof useEventLoader> & {
  isAdmin: boolean;
};

type EventDataProviderProps = Omit<PropsWithChildren<EventDataContextType>, 'isAdmin'>;

export const EventDataContext = createContext<EventDataContextType | null>(null);

const EventDataProvider = ({children, ...props}: EventDataProviderProps) => {
  const {isAdmin} = useAuthStore();

  return <EventDataContext.Provider value={{isAdmin, ...props}}>{children}</EventDataContext.Provider>;
};

export default EventDataProvider;
