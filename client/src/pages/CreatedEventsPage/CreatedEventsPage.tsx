import {css} from '@emotion/react';
import {useEffect, useState} from 'react';

import CreatedEventList from '@components/Design/components/CreatedEvent/CreatedEvent';
import useRequestGetCreatedEvents from '@hooks/queries/event/useRequestGetCreatedEvents';

import {MainLayout, Top, TopNav} from '@components/Design';

export default function CreatedEventsPage() {
  const [eventName, setEventName] = useState('');
  const {events} = useRequestGetCreatedEvents();
  const [matchedEvents, setMatchedEvents] = useState(events);

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
      </TopNav>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        `}
      >
        <Top>
          <Top.Line text="지금까지 주최했던 행사를" emphasize={['주최했던 행사']} />
          <Top.Line text="확인해 보세요" />
        </Top>
      </div>
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
}
