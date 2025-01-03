import {createContext, PropsWithChildren, useContext, useState} from 'react';

import {CreatedEvent} from 'types/serviceType';

type Mode = 'view' | 'edit';

interface SelectedEventContextProps {
  mode: Mode;
  handleMode: (mode: Mode) => void;
  selectedEvents: CreatedEvent[];
  has: (event: CreatedEvent) => boolean;
  handleSelectedEvents: (event: CreatedEvent) => void;
}

const CreatedEventsPageContext = createContext<SelectedEventContextProps | undefined>(undefined);

export const useCreatedEventsPageContext = () => {
  const context = useContext(CreatedEventsPageContext);
  if (!context) {
    throw new Error('useCreatedEventsPageContext must be used within an CreatedEventsPageContextProvider');
  }
  return context;
};

export const CreatedEventsPageContextProvider: React.FC<PropsWithChildren> = ({children}: React.PropsWithChildren) => {
  const [mode, setMode] = useState<Mode>('view');
  const [selectedEvents, setSelectedEvents] = useState<CreatedEvent[]>([]);

  const handleMode = (mode: Mode) => setMode(mode);

  const has = (event: CreatedEvent) => {
    return selectedEvents.map(event => event.eventId).includes(event.eventId);
  };

  const handleSelectedEvents = (event: CreatedEvent) => {
    if (has(event)) {
      setSelectedEvents(prev => prev.filter(prevEvent => prevEvent.eventId !== event.eventId));
    } else {
      setSelectedEvents(prev => [...prev, event]);
    }
  };

  return (
    <CreatedEventsPageContext.Provider value={{mode, handleMode, selectedEvents, has, handleSelectedEvents}}>
      {children}
    </CreatedEventsPageContext.Provider>
  );
};
