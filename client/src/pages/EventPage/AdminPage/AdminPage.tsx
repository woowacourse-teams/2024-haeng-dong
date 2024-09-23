import {useEffect} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import useRequestPostAuthenticate from '@hooks/queries/auth/useRequestPostAuthentication';
import useRequestGetSteps from '@hooks/queries/step/useRequestGetSteps';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Title, Button, Dropdown, DropdownButton} from '@HDesign/index';

import getEventIdByUrl from '@utils/getEventIdByUrl';

import {EventPageContextProps} from '../EventPageLayout';

import {receiptStyle} from './AdminPage.style';

const AdminPage = () => {
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();
  const {isAdmin, eventName} = useOutletContext<EventPageContextProps>();

  const {totalExpenseAmount} = useTotalExpenseAmountStore();

  const {steps} = useRequestGetSteps();
  const {postAuthenticate} = useRequestPostAuthenticate();

  useEffect(() => {
    postAuthenticate();
  }, [postAuthenticate]);

  const navigateAccountInputPage = () => {
    // TODO:(@cookie) 569 브랜치가 머지된 후에 작업 가능합니다.
    navigate('/');
  };

  return (
    <section css={receiptStyle}>
      <Title
        title={eventName}
        amount={totalExpenseAmount}
        dropdown={
          <Dropdown>
            <DropdownButton text="전체 참여자 관리" />
            <DropdownButton text="계좌번호 입력하기" />
          </Dropdown>
        }
      />
      <StepList data={steps ?? []} isAdmin={isAdmin} />
      <Button size="medium" onClick={() => navigate(`/event/${eventId}/addBill`)} style={{width: '100%'}}>
        지출내역 추가하기
      </Button>
    </section>
  );
};

export default AdminPage;
