import {useEffect} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import useRequestPostAuthenticate from '@hooks/queries/auth/useRequestPostAuthentication';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Title, Button} from '@HDesign/index';

import {EventPageContextProps} from '../EventPageLayout';

import {receiptStyle} from './AdminPage.style';
import getEventIdByUrl from '@utils/getEventIdByUrl';
import useRequestGetSteps from '@hooks/queries/step/useRequestGetSteps';

const AdminPage = () => {
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();
  const {eventName} = useOutletContext<EventPageContextProps>();

  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {steps} = useRequestGetSteps();
  const {postAuthenticate} = useRequestPostAuthenticate();

  useEffect(() => {
    postAuthenticate();
  }, [postAuthenticate]);

  return (
    <section css={receiptStyle}>
      <Title title={eventName} amount={totalExpenseAmount} />
      <StepList data={steps ?? []} />
      <Button size="medium" onClick={() => navigate(`/event/${eventId}/addBill`)} style={{width: '100%'}}>
        지출내역 추가하기
      </Button>
    </section>
  );
};

export default AdminPage;
