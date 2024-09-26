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
    navigate(`/event/${eventId}/admin/edit`);
  };

  const navigateEventMemberManage = () => {
    navigate(`/event/${eventId}/admin/member`);
  };

  return (
    <section css={receiptStyle}>
      <Title
        title={eventName}
        amount={totalExpenseAmount}
        dropdown={
          <Dropdown>
            <DropdownButton text="전체 참여자 관리" onClick={navigateEventMemberManage} />
            <DropdownButton text="계좌번호 입력하기" onClick={navigateAccountInputPage} />
          </Dropdown>
        }
      />
      <StepList data={steps ?? []} isAdmin={isAdmin} />
      <Button size="medium" onClick={() => navigate(`/event/${eventId}/add-bill`)} style={{width: '100%'}}>
        지출내역 추가하기
      </Button>
    </section>
  );
};

export default AdminPage;
