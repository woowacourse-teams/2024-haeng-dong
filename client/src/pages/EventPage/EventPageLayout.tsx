import {MainLayout, TopNav, Switch, Button, Flex} from 'haengdong-design';
import {Outlet, useMatch} from 'react-router-dom';
import {useEffect, useState} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import {useToast} from '@components/Toast/ToastProvider';
import {requestGetEventName} from '@apis/request/event';
import StepListProvider from '@hooks/useStepList/useStepList';

import useNavSwitch from '@hooks/useNavSwitch';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {ROUTER_URLS} from '@constants/routerUrls';

export type EventPageContextProps = {
  isAdmin: boolean;
  eventId: string;
  eventName: string;
};

const EventPageLayout = () => {
  const {nav, paths, onChange} = useNavSwitch();

  const [eventName, setEventName] = useState('');
  const eventId = getEventIdByUrl();

  useEffect(() => {
    const getEventName = async () => {
      const {eventName} = await requestGetEventName({eventId: eventId});

      setEventName(eventName);
    };

    getEventName();
  }, []);

  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;

  const outletContext: EventPageContextProps = {
    isAdmin,
    eventId,
    eventName,
  };

  const {showToast} = useToast();

  const env = process.env.NODE_ENV || '';

  return (
    <StepListProvider>
      <MainLayout backgroundColor="gray">
        <TopNav>
          <Switch value={nav} values={paths} onChange={onChange} />
          <CopyToClipboard
            text={`[행동대장]\n"${eventName}"에 대한 정산을 시작할게요:)\n아래 링크에 접속해서 정산 내역을 확인해 주세요!\nhttps://${env.includes('development') ? 'dev.' : ''}haengdong.pro${ROUTER_URLS.event}/${eventId}/home`}
            onCopy={() =>
              showToast({
                showingTime: 3000,
                message: '링크가 복사되었어요 :) \n참여자들에게 링크를 공유해 주세요!',
                type: 'confirm',
                position: 'bottom',
                bottom: '8rem',
              })
            }
          >
            <Button size="small" variants="secondary">
              정산 초대하기
            </Button>
          </CopyToClipboard>
        </TopNav>
        <Outlet context={outletContext} />
      </MainLayout>
    </StepListProvider>
  );
};

export default EventPageLayout;
