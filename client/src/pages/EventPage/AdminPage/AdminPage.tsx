import {useNavigate} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import {Banner} from '@components/Design/components/Banner';

import useAdminPage from '@hooks/useAdminPage';

import {Title, Button, Dropdown, DropdownButton} from '@HDesign/index';

import {receiptStyle} from './AdminPage.style';

const AdminPage = () => {
  const navigate = useNavigate();

  const {eventId, isAdmin, eventName, totalExpenseAmount, isShowBanner, onDelete, steps} = useAdminPage();

  const navigateAccountInputPage = () => {
    navigate(`/event/${eventId}/admin/edit`);
  };

  const navigateEventMemberManage = () => {
    navigate(`/event/${eventId}/admin/member`);
  };

  const navigateAddBill = () => {
    navigate(`/event/${eventId}/add-bill`);
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
      {isShowBanner && (
        <Banner
          onClick={navigateAccountInputPage}
          onDelete={onDelete}
          title="계좌번호가 등록되지 않았어요"
          description="계좌번호를 입력해야 참여자가 편하게 송금할 수 있어요"
          buttonText="등록하기"
        />
      )}
      {steps.length > 0 && <StepList data={steps ?? []} isAdmin={isAdmin} />}
      <Button size="medium" onClick={navigateAddBill} style={{width: '100%'}}>
        지출내역 추가하기
      </Button>
    </section>
  );
};

export default AdminPage;
