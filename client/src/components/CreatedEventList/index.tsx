import useRequestDeleteEvents from '@hooks/queries/event/useRequestDeleteEvents';
import {useCreatedEventsPageContext} from '@pages/main/events/CreatedEvent.context';
import {CreatedEvent} from 'types/serviceType';
import {CreatedEventItem} from '@components/Design/components/CreatedEventItem/CreatedEventItem';

import useAmplitude from '@hooks/useAmplitude';

import {FixedButton, Flex, Input} from '@components/Design';

type CreatedEventListProps = {
  eventName: string;
  onSearch: ({target}: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  createdEvents: CreatedEvent[];
};

export const CreatedEventList = ({createdEvents, eventName, onSearch, placeholder}: CreatedEventListProps) => {
  const {mode, handleMode, selectedEvents, isAlreadySelected, handleSelectedEvents} = useCreatedEventsPageContext();
  const setViewMode = () => handleMode('view');

  const {deleteEvents} = useRequestDeleteEvents();
  const {trackDeleteEvent} = useAmplitude();

  const onDeleteClick = async () => {
    const selectedEventsId = selectedEvents.map(event => event.eventId);
    await deleteEvents({eventIds: selectedEventsId}, {onSuccess: () => trackDeleteEvent('multi')});
    handleMode('view');
  };

  return (
    <>
      <Flex
        flexDirection="column"
        width="100%"
        backgroundColor="white"
        padding="0.5rem 1rem"
        paddingInline="0.5rem"
        gap="0.5rem"
        height="100%"
        cssProp={{borderRadius: '1rem'}}
      >
        <Input inputType="search" value={eventName} onChange={onSearch} placeholder={placeholder} />
        {createdEvents.length !== 0 &&
          createdEvents.map(createdEvent => (
            <CreatedEventItem
              key={createdEvent.eventId}
              isEditMode={mode === 'edit'}
              setEditMode={() => handleMode('edit')}
              isChecked={isAlreadySelected(createdEvent)}
              onChange={handleSelectedEvents}
              createdEvent={createdEvent}
            />
          ))}
      </Flex>
      {mode === 'edit' && (
        <FixedButton variants="tertiary" onDeleteClick={onDeleteClick} onClick={setViewMode}>
          편집완료
        </FixedButton>
      )}
    </>
  );
};
