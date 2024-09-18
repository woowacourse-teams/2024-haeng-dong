import {useEffect} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/StepList';
import useRequestPostAuthenticate from '@hooks/queries/useRequestPostAuthentication';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Title, Button} from '@HDesign/index';

import {EventPageContextProps} from '../EventPageLayout';

import {receiptStyle} from './AdminPage.style';
import useRequestGetStepList from '@hooks/queries/useRequestGetStepList';
import {ROUTER_URLS} from '@constants/routerUrls';
import getEventIdByUrl from '@utils/getEventIdByUrl';

const AdminPage = () => {
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();
  const {eventName} = useOutletContext<EventPageContextProps>();

  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {data: stepList} = useRequestGetStepList();
  const {mutate: postAuthentication} = useRequestPostAuthenticate();

  useEffect(() => {
    postAuthentication();
  }, [postAuthentication]);

  return (
    <section css={receiptStyle}>
      <Title title={eventName} amount={totalExpenseAmount} />
      <StepList data={stepList ?? []} />
      <Button size="medium" onClick={() => navigate(`/event/${eventId}/addBill`)} style={{width: '100%'}}>
        지출내역 추가하기
      </Button>
    </section>
  );
};

export default AdminPage;
