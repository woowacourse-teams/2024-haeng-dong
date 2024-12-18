import {CreatedEvent} from './../../../../types/serviceType';

export interface CreatedEventItemProps {
  createdEvent: CreatedEvent;
}

export interface CreatedEventListProps {
  eventName: string;
  onSearch: ({target}: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  createdEvents: CreatedEvent[];
}
