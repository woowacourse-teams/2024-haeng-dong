import {useNavigate} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import {Banner} from '@components/Design/components/Banner';

import useAdminPage from '@hooks/useAdminPage';
import useAmplitude from '@hooks/useAmplitude';

import {Title, Button, Dropdown, DropdownButton} from '@HDesign/index';

import {receiptStyle} from './AdminPage.style';

const AdminPage = () => {
  const navigate = useNavigate();
  const {trackAddBillStart} = useAmplitude();

  const {
    eventId,
    isAdmin,
    eventName,
    bankName,
    accountNumber,
    totalExpenseAmount,
    isShowAccountBanner,
    onDeleteAccount,
    steps,
    isShowDepositStateBanner,
    onDeleteDepositState,
  } = useAdminPage();

  const navigateAccountInputPage = () => {
    navigate(`/event/${eventId}/admin/edit-account`, {state: {accountNumber, bankName}});
  };

  const navigateEditEventName = () => {
    navigate(`/event/${eventId}/admin/edit-event-name`, {state: eventName});
  };

  const navigateEventMemberManage = () => {
    navigate(`/event/${eventId}/admin/members`);
  };

  const navigateAddImages = () => {
    navigate(`/event/${eventId}/admin/add-images`);
  };

  const navigateAddBill = () => {
    trackAddBillStart({eventName, eventToken: eventId});
    navigate(`/event/${eventId}/admin/add-bill`);
  };

  return (
    <section css={receiptStyle}>
      <Title
        title={eventName}
        amount={totalExpenseAmount}
        dropdown={
          <Dropdown>
            <DropdownButton text="행사 이름 변경" onClick={navigateEditEventName} />
            <DropdownButton text="전체 참여자 관리" onClick={navigateEventMemberManage} />
            <DropdownButton text="계좌번호 입력하기" onClick={navigateAccountInputPage} />
            <DropdownButton text="사진 첨부하기" onClick={navigateAddImages} />
          </Dropdown>
        }
      />
      {isShowAccountBanner && (
        <Banner
          onClick={navigateAccountInputPage}
          onDelete={onDeleteAccount}
          title="계좌번호가 등록되지 않았어요"
          description="계좌번호를 입력해야 참여자가 편하게 송금할 수 있어요"
          buttonText="등록하기"
        />
      )}
      {isShowDepositStateBanner && (
        <Banner
          onClick={navigateEventMemberManage}
          onDelete={onDeleteDepositState}
          title="참여자 입금상태를 관리할 수 있어요"
          description="어떤 참여자가 입금을 완료했는지 기록해 보세요"
          buttonText="관리하기"
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
