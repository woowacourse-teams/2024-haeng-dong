import {css} from '@emotion/react';
import {useEffect, useState} from 'react';

import useRequestGetCreatedEvents from '@hooks/queries/event/useRequestGetCreatedEvents';
import {CreatedEvent} from 'types/serviceType';
import {CreatedEventItem} from '@components/Design/components/CreatedEvent/CreatedEvent';
import useRequestDeleteEvents from '@hooks/queries/event/useRequestDeleteEvents';

import {FixedButton, Flex, FunnelLayout, Input, MainLayout, TextButton, Top, TopNav} from '@components/Design';

import {useCreatedEventsPageContext, CreatedEventsPageContextProvider} from './CreatedEvent.context';

interface CreatedEventListProps {
  eventName: string;
  onSearch: ({target}: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  createdEvents: CreatedEvent[];
}

const PageInner = () => {
  const [eventName, setEventName] = useState('');
  const {events} = useRequestGetCreatedEvents();
  const [matchedEvents, setMatchedEvents] = useState(events);
  const {mode, handleMode} = useCreatedEventsPageContext();

  useEffect(() => {
    setMatchedEvents(events?.filter(event => event.eventName.includes(eventName)));
  }, [eventName, events]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  return (
    <MainLayout backgroundColor="white">
      <TopNav>
        <TopNav.Item displayName="뒤로가기" noEmphasis routePath="-1" />
        {mode === 'view' && (
          <TextButton textColor="gray" textSize="bodyBold" onClick={() => handleMode('edit')}>
            편집하기
          </TextButton>
        )}
      </TopNav>
      <FunnelLayout>
        <Top>
          <Top.Line text="지금까지 주최했던 행사를" emphasize={['주최했던 행사']} />
          <Top.Line text="확인해 보세요" />
        </Top>
      </FunnelLayout>
      <div
        css={css`
          display: flex;
          padding-inline: 0.5rem;
        `}
      >
        <CreatedEventList
          createdEvents={matchedEvents ?? []}
          eventName={eventName}
          onSearch={onSearch}
          placeholder="행사 이름 검색"
        />
      </div>
    </MainLayout>
  );
};

export default function CreatedEventsPage() {
  return (
    <MainLayout backgroundColor="white">
      <CreatedEventsPageContextProvider>
        <PageInner />
      </CreatedEventsPageContextProvider>
    </MainLayout>
  );
}

function CreatedEventList({createdEvents, eventName, onSearch, placeholder}: CreatedEventListProps) {
  const {mode, handleMode, selectedEvents, has, handleSelectedEvents} = useCreatedEventsPageContext();
  const setViewMode = () => handleMode('view');

  const {deleteEvents} = useRequestDeleteEvents();

  const onDeleteClick = async () => {
    const selectedEventsId = selectedEvents.map(event => event.eventId);
    await deleteEvents({eventIds: selectedEventsId});
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
              isChecked={has(createdEvent)}
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
}
