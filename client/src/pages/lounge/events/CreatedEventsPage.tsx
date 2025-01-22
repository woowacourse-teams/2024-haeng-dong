import {css} from '@emotion/react';
import {useEffect, useState} from 'react';

import useRequestGetCreatedEvents from '@hooks/queries/event/useRequestGetCreatedEvents';

import {FunnelLayout, MainLayout, TextButton, Top, TopNav} from '@components/Design';
import {CreatedEventList} from '@components/CreatedEventList';

import {useCreatedEventsPageContext, CreatedEventsPageContextProvider} from './CreatedEvent.context';

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
