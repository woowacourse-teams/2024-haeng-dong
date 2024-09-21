import type {Event} from 'types/serviceType';

import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import {useToast} from '@hooks/useToast/useToast';

import useNavSwitch from '@hooks/useNavSwitch';
import useEventPageLayout from '@hooks/useEventPageLayout';

import {MainLayout, TopNav, Switch, Button} from '@HDesign/index';

import getEventPageUrlByEnvironment from '@utils/getEventPageUrlByEnvironment';
import getReplacedLastPath from '@utils/getReplacedLastPath';

import {ROUTER_URLS} from '@constants/routerUrls';

export type EventPageContextProps = Event & {
  isAdmin: boolean;
};

const EventPageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {nav, paths, onChange} = useNavSwitch();
  const {eventId, isAdmin, isLoginPage, eventOutline} = useEventPageLayout();

  const outletContext: EventPageContextProps = {
    isAdmin,
    ...eventOutline,
  };

  const {showToast} = useToast();
  const url = getEventPageUrlByEnvironment(eventId, 'home');

  const induceBankInfoBeforeShare = () => {
    if (eventOutline.bankName === '' || eventOutline.accountNumber === '') {
      navigate(getReplacedLastPath(location.pathname, 'update'));
    }
  };

  return (
    <MainLayout backgroundColor="gray">
      <TopNav>
        <Switch value={nav} values={paths} onChange={onChange} />
        {!isLoginPage && (
          <CopyToClipboard
            text={`[행동대장]\n"${eventOutline.eventName}"에 대한 정산을 시작할게요:)\n아래 링크에 접속해서 정산 내역을 확인해 주세요!\n${url}`}
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
            <Button size="small" variants="secondary" onClick={induceBankInfoBeforeShare}>
              정산 초대하기
            </Button>
          </CopyToClipboard>
        )}
      </TopNav>
      <Outlet context={outletContext} />
    </MainLayout>
  );
};

export default EventPageLayout;
