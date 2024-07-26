import {Tab, Tabs, Title} from 'haengdong-design';

import MemberReportList from '@components/MemberReportList/MemberReportList';
import StepList from '@components/StepList/StepList';
import {useStepList} from '@hooks/useStepList/useStepList';
import {useEffect, useState} from 'react';
import useEventId from '@hooks/useEventId/useEventId';
import {requestGetEventName} from '@apis/request/event';

const HomeContent = () => {
  const {getTotalPrice} = useStepList();
  const {eventId} = useEventId();

  // TODO: (@soha) 행사 이름 나중에 따로 분리해야 함
  const [eventName, setEventName] = useState(' ');

  useEffect(() => {
    if (eventId === '') return;

    const getEventName = async () => {
      const {eventName} = await requestGetEventName({eventId: eventId ?? ''});

      setEventName(eventName);
    };

    getEventName();
  }, [eventId]);

  return (
    <>
      <Title title={eventName} price={getTotalPrice()} />
      <Tabs tabsContainerStyle={{gap: '1rem'}}>
        <Tab label="전체 지출 내역" content={<StepList />} />
        <Tab label="참여자 별 내역" content={<MemberReportList />} />
      </Tabs>
    </>
  );
};

export default HomeContent;
