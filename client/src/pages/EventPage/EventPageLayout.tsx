import {MainLayout, TopNav, Switch, Button} from 'haengdong-design';
import {Outlet, useMatch} from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import {useToast} from '@hooks/useToast/useToast';
import useRequestGetEventName from '@hooks/queries/useRequestGetEventName';

import useNavSwitch from '@hooks/useNavSwitch';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import getEventPageUrlByEnvironment from '@utils/getEventPageUrlByEnvironment';

import {ROUTER_URLS} from '@constants/routerUrls';

export type EventPageContextProps = {
  isAdmin: boolean;
  eventName: string;
};

const EventPageLayout = () => {
  const {nav, paths, onChange} = useNavSwitch();
  const {data} = useRequestGetEventName();
  const eventName = data?.eventName ?? '';
  const eventId = getEventIdByUrl();

  const isAdmin = useMatch(ROUTER_URLS.eventManage) !== null;

  const outletContext: EventPageContextProps = {
    isAdmin,
    eventName,
  };

  const {showToast} = useToast();
  const url = getEventPageUrlByEnvironment(eventId, 'home');

  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <Switch value={nav} values={paths} onChange={onChange} />
        <CopyToClipboard
          text={`[행동대장]\n"${eventName}"에 대한 정산을 시작할게요:)\n아래 링크에 접속해서 정산 내역을 확인해 주세요!\n${url}`}
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
  );
};

export default EventPageLayout;
