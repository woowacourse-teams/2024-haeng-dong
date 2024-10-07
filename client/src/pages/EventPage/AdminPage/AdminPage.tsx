import {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';

import StepList from '@components/StepList/Steps';
import useRequestPostAuthenticate from '@hooks/queries/auth/useRequestPostAuthentication';
import useRequestGetSteps from '@hooks/queries/step/useRequestGetSteps';
import {Banner} from '@components/Design/components/Banner';

import {useTotalExpenseAmountStore} from '@store/totalExpenseAmountStore';

import {Title, Button, Dropdown, DropdownButton} from '@HDesign/index';

import getEventIdByUrl from '@utils/getEventIdByUrl';
import SessionStorage from '@utils/SessionStorage';

import SESSION_STORAGE_KEYS from '@constants/sessionStorageKeys';

import {EventPageContextProps} from '../EventPageLayout';

import {receiptStyle} from './AdminPage.style';

const AdminPage = () => {
  const navigate = useNavigate();
  const eventId = getEventIdByUrl();
  const {isAdmin, eventName, bankName, accountNumber} = useOutletContext<EventPageContextProps>();

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

  // session storage에 배너를 지웠는지 관리
  const storageValue = SessionStorage.get<boolean>(SESSION_STORAGE_KEYS.closeAccountBanner);
  const isClosed = storageValue !== null && storageValue === true;

  const [isShowBanner, setIsShowBanner] = useState<boolean>((bankName === '' || accountNumber === '') && !isClosed);

  useEffect(() => {
    setIsShowBanner((bankName === '' || accountNumber === '') && !isClosed);
  }, [bankName, accountNumber, isShowBanner]);

  const onDelete = () => {
    setIsShowBanner(false);
    SessionStorage.set<boolean>(SESSION_STORAGE_KEYS.closeAccountBanner, true);
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
      <Button size="medium" onClick={() => navigate(`/event/${eventId}/add-bill`)} style={{width: '100%'}}>
        지출내역 추가하기
      </Button>
    </section>
  );
};

export default AdminPage;
